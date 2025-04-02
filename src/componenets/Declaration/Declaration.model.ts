import {TextLabel} from "./Declaration.tsx";

export type DeclarationProps = {
    labeling: TextLabel[];
    text: string;
    onChange: (labeling: TextLabel[]) => void;
    selectedLabel: string | null;
}

