import{JSX} from 'react';
import {DeclarationProps} from "./Declaration.model.ts";

import styles from './Declaration.module.css'

export type TextLabel = {
    start: number;
    end: number;
    label: string
}

export const Declaration: React.FC<DeclarationProps> = ({text, labeling, onChange, selectedLabel}): JSX.Element => {
    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (!selection || !selectedLabel || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const textNode = document.getElementById('document-text');
        if (!textNode || !textNode.contains(range.startContainer)) return;

        let start = 0;
        let end = 0;
        let currentOffset = 0;

        const walkNodes = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const nodeText = node.textContent || '';
                const nodeLength = nodeText.length;
                if (node === range.startContainer) {
                    start = currentOffset + range.startOffset;
                }
                if (node === range.endContainer) {
                    end = currentOffset + range.endOffset;
                }
                currentOffset += nodeLength;
            } else {
                node.childNodes.forEach(child => walkNodes(child));
            }
        };
        walkNodes(textNode);

        if (start === end) return;

        const newLabel: TextLabel = { start, end, label: selectedLabel };
        const updatedLabeling = [...labeling, newLabel].sort((a, b) => a.start - b.start);
        onChange(updatedLabeling);

        selection.removeAllRanges();
    };


    const renderTextWithLabels = () => {
        let lastIndex = 0;
        const elements: JSX.Element[] = [];
        const sortedLabeling = [...labeling].sort((a, b) => a.start - b.start);
        const labelColors: { [key: string]: string } = {
            'ФИО': '#ccffcc',
            'Дата': '#cce5ff',
            'Тип': '#ffcccc',
        };

        sortedLabeling.forEach((textlabel, i) => {
            const color = labelColors[textlabel.label] || '#000000';
            if (textlabel.start > lastIndex) {
                elements.push(<span key={`text-${i}`}>{text.slice(lastIndex, textlabel.start)}</span>);
            }

            elements.push(
                <span
                    key={`label-${i}`}
                    style={{ backgroundColor: color, padding: '2px 4px', borderRadius: '3px' }}
                >
          {text.slice(textlabel.start, textlabel.end)}
        </span>
            );
            lastIndex = textlabel.end;
        });

        if (lastIndex < text.length) {
            elements.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);
        }
        console.log(elements)
        return elements;
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Документ</h3>
            <div id='document-text' className={styles.textContent} onMouseUp={handleTextSelection}>
                {renderTextWithLabels()}
            </div>
        </div>
    )
  }