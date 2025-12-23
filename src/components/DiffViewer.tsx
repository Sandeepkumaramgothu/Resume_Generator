import { diffWords } from 'diff';

interface DiffViewerProps {
    oldText: string;
    newText: string;
}

export function DiffViewer({ oldText, newText }: DiffViewerProps) {
    const changes = diffWords(oldText, newText);

    return (
        <div className="font-mono text-sm whitespace-pre-wrap leading-relaxed p-6">
            {changes.map((part, index) => {
                const color = part.added
                    ? 'bg-green-500/20 text-green-300'
                    : part.removed
                        ? 'bg-red-500/20 text-red-400 line-through decoration-red-500/50'
                        : 'text-slate-400';

                return (
                    <span key={index} className={`${color} px-0.5 rounded-sm`}>
                        {part.value}
                    </span>
                );
            })}
        </div>
    );
}
