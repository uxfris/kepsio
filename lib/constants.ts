import { LinkIcon, ImageIcon } from "@/components/icons";

type IconComponent = ({ className }: { className?: string }) => React.JSX.Element;

export const generateDropdownMenuContent: Array<{
    id: string;
    icon: IconComponent;
    alt: string;
    title: string;
}> = [
        {
            id: "productLink",
            icon: LinkIcon,
            alt: "Link",
            title: "Add product link",
        },
        {
            id: "uploadImage",
            icon: ImageIcon,
            alt: "image",
            title: "Upload image",
        }
    ];