import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(
    import('react-quill'),
    {
        ssr: false,
        loading: () => <div />,
    },
);

const TextEditor = (props) => {
    const {
        modules = ({
            toolbar: [
                [{ header: '1' }, { header: '2' }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' },
                    { indent: '-1' }, { indent: '+1' }],
                ['link'],
                ['clean'],
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        }),
        ...other
    } = props;

    return (
        <QuillNoSSRWrapper
            modules={modules}
            {...other}
        />
    );
};

export default TextEditor;
