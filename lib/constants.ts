/**
 * @deprecated This file is deprecated. Import from '@/lib/constants' directly.
 * This file now re-exports from the organized constants directory.
 */

// Re-export all new constants
export * from './constants/generator';

// Legacy aliases for backward compatibility with old code
import {
    GENERATE_DROPDOWN_MENU_ITEMS,
    CAPTION_TIPS,
    CAPTION_RESULT_FILTERS,
    MOCK_CAPTIONS
} from './constants/generator';

export const generateDropdownMenuContent = GENERATE_DROPDOWN_MENU_ITEMS;
export const tips = CAPTION_TIPS;
export const captionResultFilters = CAPTION_RESULT_FILTERS;
export const captions = MOCK_CAPTIONS;
