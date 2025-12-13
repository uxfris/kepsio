/**
 * A small, safe, typed wrapper around fetch() for server and client use.
 * Supports: JSON POST/GET/PUT/DELETE, timeouts, auth headers.
 */

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface FetchOptions<TBody = any> {
    method?: ApiMethod;
    body?: TBody;
    headers?: Record<string, string>;
    timeoutMs?: number;
}

export interface ApiError {
    status: number;
    message: string;
    details?: any;
}

export class ApiException extends Error {
    status: number;
    details?: any;

    constructor(error: ApiError) {
        super(error.message);
        this.status = error.status;
        this.details = error.details;
    }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    if (!timeoutMs) return promise;

    return Promise.race<T>([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
        ),
    ]);
}

export async function apiFetch<TResponse = any, TBody = any>(
    url: string,
    options: FetchOptions<TBody> = {}
): Promise<TResponse> {
    const {
        method = "GET",
        body,
        headers = {},
        timeoutMs = 60000, // default timeout
    } = options;

    const fetchOptions: RequestInit = {
        method,
        headers: {
            "Accept": "application/json",
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    try {
        const res = await withTimeout(fetch(url, fetchOptions), timeoutMs);

        // If it's not JSON, attempt to parse plain text
        const text = await res.text();
        let data: any;

        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text;
        }

        if (!res.ok) {
            throw new ApiException({
                status: res.status,
                message: data?.message || data || "Request failed",
                details: data,
            });
        }

        return data as TResponse;
    } catch (err: any) {
        if (err instanceof ApiException) throw err;

        // Unexpected or network error
        throw new ApiException({
            status: 0,
            message: err?.message || "Network error",
            details: err,
        });
    }
}

/* -----------------------------------------------------
 * Convenience Helpers
 * ----------------------------------------------------- */

export const api = {
    get: <T>(url: string, opts?: Omit<FetchOptions, "method" | "body">) =>
        apiFetch<T>(url, { ...opts, method: "GET" }),

    post: <T>(url: string, body?: any, opts?: Omit<FetchOptions, "method">) =>
        apiFetch<T>(url, { ...opts, method: "POST", body }),

    put: <T>(url: string, body?: any, opts?: Omit<FetchOptions, "method">) =>
        apiFetch<T>(url, { ...opts, method: "PUT", body }),

    delete: <T>(url: string, opts?: Omit<FetchOptions, "method" | "body">) =>
        apiFetch<T>(url, { ...opts, method: "DELETE" }),
};
