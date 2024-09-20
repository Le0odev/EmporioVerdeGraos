declare module 'html2pdf.js' {
    export default function html2pdf(): {
        from: (element: HTMLElement) => {
            set: (options: object) => {
                save: () => Promise<void>;
            };
        };
    };
}
