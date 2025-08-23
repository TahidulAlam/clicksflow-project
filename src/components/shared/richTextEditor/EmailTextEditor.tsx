// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   useRef,
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
//   useCallback,
//   type ComponentType
// } from "react";
// import {
//   EditorComposer,
//   Editor,
//   ToolbarPlugin,
//   AlignDropdown,
//   BackgroundColorPicker,
//   BoldButton,
//   CodeFormatButton,
//   FontFamilyDropdown,
//   FontSizeDropdown,
//   InsertDropdown,
//   InsertLinkButton,
//   ItalicButton,
//   TextColorPicker,
//   TextFormatDropdown,
//   UnderlineButton,
//   Divider
// } from "verbum";
// import { $getRoot } from "lexical";
// import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

// export interface EmailTextEditorRef {
//   focus: () => void;
//   getHtmlContent: () => string;
//   getTextContent: () => string;
//   clearContent: () => void;
//   getCharacterCount: () => number;
//   getEditorInstance: () => any;
// }

// interface EmailTextEditorProps {
//   value?: string;
//   placeholder?: string;
//   readOnly?: boolean;
//   theme?: "light" | "dark" | "system";
//   maxLength?: number;
//   autoFocus?: boolean;
//   onChange?: (html: string, textContent: string) => void;
//   onBlur?: (html: string) => void;
//   onFocus?: () => void;
//   onEditorReady?: (editor: any) => void;
//   toolbarConfig?: {
//     visible?: boolean;
//     items?: React.ReactNode[];
//     customToolbar?: React.ReactNode;
//     sticky?: boolean;
//   };
//   plugins?: ComponentType[];
//   characterLimitExceeded?: (exceeded: boolean) => void;
//   className?: string;
//   editorClassName?: string;
//   toolbarClassName?: string;
//   statusBarClassName?: string;
//   showStatusBar?: boolean;
//   customPlaceholder?: React.ReactNode;
//   resetKey?: string | number;
// }

// const EmailTextEditor = forwardRef<EmailTextEditorRef, EmailTextEditorProps>(
//   (
//     {
//       value = "",
//       placeholder = "Start typing your email...",
//       readOnly = false,
//       theme = "light",
//       maxLength = 5000,
//       autoFocus = false,
//       onChange,
//       onBlur,
//       onFocus,
//       onEditorReady,
//       toolbarConfig = {
//         visible: true,
//         items: undefined,
//         sticky: true
//       },
//       plugins = [],
//       characterLimitExceeded,
//       className = "",
//       editorClassName = "",
//       toolbarClassName = "",
//       statusBarClassName = "",
//       showStatusBar = true,
//       // customPlaceholder,
//       resetKey
//     },
//     ref
//   ) => {
//     const [characterCount, setCharacterCount] = useState(0);
//     const editorRef = useRef<any>(null);
//     const lastSetValueRef = useRef<string>(value);
//     const isMountedRef = useRef(false);
//     const isEditorReadyCalled = useRef(false);
//     const isControlled = useRef(value !== undefined);
//     const isComposingRef = useRef(false);
//     const autoFocusRef = useRef(autoFocus);
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Update autoFocus ref when prop changes
//     useEffect(() => {
//       autoFocusRef.current = autoFocus;
//     }, [autoFocus]);

//     // Reset editor when resetKey changes
//     useEffect(() => {
//       if (editorRef.current && resetKey !== undefined) {
//         editorRef.current.update(() => {
//           const root = $getRoot();
//           root.clear();

//           if (value) {
//             const parser = new DOMParser();
//             const dom = parser.parseFromString(value, "text/html");
//             const nodes = $generateNodesFromDOM(editorRef.current, dom);
//             root.append(...nodes);
//           }
//         });
//         lastSetValueRef.current = value;
//         updateCharacterCount();
//       }
//     }, [resetKey, value]);

//     // Handle external value changes
//     useEffect(() => {
//       if (!editorRef.current || !isMountedRef.current || !isControlled.current) return;

//       if (value !== lastSetValueRef.current) {
//         editorRef.current.update(() => {
//           const root = $getRoot();
//           const currentHtml = $generateHtmlFromNodes(editorRef.current);

//           // Normalize HTML for comparison
//           const normalizedCurrent = currentHtml.replace(/\s+/g, ' ').trim();
//           const normalizedValue = value.replace(/\s+/g, ' ').trim();

//           if (normalizedValue !== normalizedCurrent) {
//             root.clear();
//             const parser = new DOMParser();
//             const dom = parser.parseFromString(value, "text/html");
//             const nodes = $generateNodesFromDOM(editorRef.current, dom);
//             root.append(...nodes);
//             lastSetValueRef.current = value;
//             updateCharacterCount();
//           }
//         });
//       }
//     }, [value]);

//     // Character limit handling
//     useEffect(() => {
//       characterLimitExceeded?.(characterCount > maxLength);
//     }, [characterCount, maxLength, characterLimitExceeded]);

//     // Mount status
//     useEffect(() => {
//       isMountedRef.current = true;
//       return () => {
//         isMountedRef.current = false;
//       };
//     }, []);

//     // Implement autoFocus functionality
//     useEffect(() => {
//       if (autoFocusRef.current && editorRef.current) {
//         // Use setTimeout to ensure focus is applied after editor is fully initialized
//         setTimeout(() => {
//           if (editorRef.current) {
//             editorRef.current.focus();
//           }
//         }, 100);
//       }
//     }, [editorRef.current]);

//     // Implement custom blur handling
//     useEffect(() => {
//       if (!containerRef.current || !onBlur) return;

//       const handleBlurEvent = (e: FocusEvent) => {
//         if (!containerRef.current?.contains(e.relatedTarget as Node)) {
//           if (editorRef.current && !isComposingRef.current) {
//             editorRef.current.getEditorState().read(() => {
//               const html = $generateHtmlFromNodes(editorRef.current);
//               onBlur(html);
//             });
//           }
//         }
//       };

//       const container = containerRef.current;
//       container.addEventListener('focusout', handleBlurEvent as EventListener);

//       return () => {
//         container.removeEventListener('focusout', handleBlurEvent as EventListener);
//       };
//     }, [onBlur]);

//     const updateCharacterCount = useCallback(() => {
//       editorRef.current?.getEditorState().read(() => {
//         const textLength = $getRoot().getTextContent().length;
//         setCharacterCount(textLength);
//       });
//     }, []);

//     const handleChange = useCallback(
//       (_editorState: string, editor: any) => {
//         if (!editor) return;

//         if (!editorRef.current) {
//           editorRef.current = editor;

//           // Apply autoFocus when editor is first initialized
//           if (autoFocusRef.current) {
//             setTimeout(() => {
//               if (editorRef.current) {
//                 editorRef.current.focus();
//               }
//             }, 100);
//           }
//         }

//         if (!isEditorReadyCalled.current) {
//           isEditorReadyCalled.current = true;
//           onEditorReady?.(editor);
//         }

//         editor.getEditorState().read(() => {
//           const html = $generateHtmlFromNodes(editor);
//           const textContent = $getRoot().getTextContent();

//           if (html !== lastSetValueRef.current) {
//             onChange?.(html, textContent);
//             if (isControlled.current) {
//               lastSetValueRef.current = html;
//             }
//           }

//           setCharacterCount(textContent.length);
//         });
//       },
//       [onChange, onEditorReady]
//     );

//     const handleCompositionStart = useCallback(() => {
//       isComposingRef.current = true;
//     }, []);

//     const handleCompositionEnd = useCallback(() => {
//       isComposingRef.current = false;
//     }, []);

//     // Expose API methods
//     useImperativeHandle(ref, () => ({
//       focus: () => editorRef.current?.focus(),
//       getHtmlContent: () => {
//         let html = "";
//         if (editorRef.current) {
//           editorRef.current.getEditorState().read(() => {
//             html = $generateHtmlFromNodes(editorRef.current);
//           });
//         }
//         return html;
//       },
//       getTextContent: () => {
//         let text = "";
//         if (editorRef.current) {
//           editorRef.current.getEditorState().read(() => {
//             text = $getRoot().getTextContent();
//           });
//         }
//         return text;
//       },
//       clearContent: () => {
//         editorRef.current?.update(() => {
//           $getRoot().clear();
//         });
//       },
//       getCharacterCount: () => characterCount,
//       getEditorInstance: () => editorRef.current
//     }));

//     // Custom Toolbar
//     const renderToolbar = () => {
//       if (!toolbarConfig?.visible) return null;

//       if (toolbarConfig.customToolbar) {
//         return toolbarConfig.customToolbar;
//       }

//       const defaultItems = toolbarConfig.items || [
//         <FontFamilyDropdown key="font-family" />,
//         <FontSizeDropdown key="font-size" />,
//         <Divider key="div1" />,
//         <BoldButton key="bold" />,
//         <ItalicButton key="italic" />,
//         <UnderlineButton key="underline" />,
//         <CodeFormatButton key="code" />,
//         <InsertLinkButton key="link" />,
//         <Divider key="div2" />,
//         <TextColorPicker key="text-color" />,
//         <BackgroundColorPicker key="bg-color" />,
//         <TextFormatDropdown key="text-format" />,
//         <Divider key="div3" />,
//         <InsertDropdown
//           key="insert"
//           enableImage={{ enable: true, maxWidth: 600 }}
//           enablePoll={true}
//           enableTable={true}
//         />,
//         <Divider key="div4" />,
//         <AlignDropdown key="align" />
//       ];

//       return (
//         <ToolbarPlugin
//           defaultFontSize="16px"
//           className={`w-full flex flex-wrap items-center gap-2 px-2 py-1 bg-gray-100 border-b border-gray-300 ${toolbarClassName}`}
//           sticky={toolbarConfig.sticky}
//         >
//           {defaultItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-center px-2 py-1 rounded-md hover:bg-gray-200 transition"
//             >
//               {item}
//             </div>
//           ))}
//         </ToolbarPlugin>
//       );
//     };

//     const themeClass =
//       theme === "dark"
//         ? "dark-theme bg-gray-900 text-white"
//         : theme === "system"
//         ? "system-theme"
//         : "light-theme bg-white text-gray-800";

//     return (
//       <div
//         ref={containerRef}
//         className={`email-editor border border-gray-300 rounded-md shadow-md overflow-hidden ${themeClass} ${className}`}
//       >
//         <EditorComposer>
//           <Editor
//             placeholder={placeholder}
//             onChange={handleChange}
//             isEditable={!readOnly}
//             onFocus={onFocus}
//             onCompositionStart={handleCompositionStart}
//             onCompositionEnd={handleCompositionEnd}
//             className={`flex flex-col ${editorClassName}`}
//           >
//             {/* Toolbar */}
//             {renderToolbar()}

//             {/* Editable area */}
//             <div className="editor-content flex-1 min-h-[250px] p-4 text-gray-800 leading-relaxed prose prose-sm max-w-none">
//               {plugins.map((Plugin, index) => (
//                 <Plugin key={`plugin-${index}`} />
//               ))}
//             </div>
//           </Editor>
//         </EditorComposer>

//         {/* Status bar */}
//         {showStatusBar && (
//           <div
//             className={`editor-status-bar flex justify-end items-center px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 ${statusBarClassName}`}
//           >
//             {characterCount > maxLength && (
//               <span className="text-red-500 font-semibold mr-2">
//                 Character limit exceeded!
//               </span>
//             )}
//             <span
//               className={`character-count ${
//                 characterCount > maxLength
//                   ? "text-red-500 font-bold"
//                   : "text-gray-500"
//               }`}
//             >
//               {characterCount}/{maxLength}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// EmailTextEditor.displayName = "EmailTextEditor";
// export default EmailTextEditor;
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  type ComponentType,
} from "react";
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from "verbum";
import { $getRoot } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

export interface EmailTextEditorRef {
  focus: () => void;
  getHtmlContent: () => string;
  getTextContent: () => string;
  clearContent: () => void;
  getCharacterCount: () => number;
  getEditorInstance: () => any;
}

interface EmailTextEditorProps {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  theme?: "light" | "dark" | "system";
  maxLength?: number;
  autoFocus?: boolean;
  onChange?: (html: string, textContent: string) => void;
  onBlur?: (html: string) => void;
  onFocus?: () => void;
  onEditorReady?: (editor: any) => void;
  toolbarConfig?: {
    visible?: boolean;
    items?: React.ReactNode[];
    customToolbar?: React.ReactNode;
    sticky?: boolean;
  };
  plugins?: ComponentType<any>[];
  characterLimitExceeded?: (exceeded: boolean) => void;
  className?: string;
  editorClassName?: string;
  toolbarClassName?: string;
  statusBarClassName?: string;
  showStatusBar?: boolean;
  customPlaceholder?: React.ReactNode;
  resetKey?: string | number;
}

const EmailTextEditor = forwardRef<EmailTextEditorRef, EmailTextEditorProps>(
  (props, ref) => {
    const {
      value,
      placeholder = "Start typing your email...",
      readOnly = false,
      theme = "light",
      maxLength = 5000,
      autoFocus = false,
      onChange,
      onBlur,
      onFocus,
      onEditorReady,
      toolbarConfig = {
        visible: true,
        items: undefined,
        sticky: true,
      },
      plugins = [],
      characterLimitExceeded,
      className = "",
      editorClassName = "",
      toolbarClassName = "",
      statusBarClassName = "",
      showStatusBar = true,
      resetKey,
    } = props;

    const [characterCount, setCharacterCount] = useState(0);
    const editorRef = useRef<any>(null);
    const lastSetValueRef = useRef<string>(value ?? "");
    const isMountedRef = useRef(false);
    const isEditorReadyCalled = useRef(false);
    const isControlled = useRef<boolean>(value !== undefined);
    const isComposingRef = useRef(false);
    const autoFocusRef = useRef(autoFocus);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep autoFocus ref up to date
    useEffect(() => {
      autoFocusRef.current = autoFocus;
    }, [autoFocus]);

    // Reset editor when resetKey changes
    useEffect(() => {
      if (editorRef.current && resetKey !== undefined) {
        try {
          editorRef.current.update(() => {
            const root = $getRoot();
            root.clear();

            if (value) {
              const parser = new DOMParser();
              const dom = parser.parseFromString(value, "text/html");
              const nodes = $generateNodesFromDOM(editorRef.current, dom);
              root.append(...nodes);
            }
          });
          lastSetValueRef.current = value ?? "";
          updateCharacterCount();
        } catch {
          // ignore
        }
      }
    }, [resetKey, value]);

    // Handle external value changes (controlled mode)
    useEffect(() => {
      if (!editorRef.current || !isMountedRef.current || !isControlled.current)
        return;

      if (value !== lastSetValueRef.current) {
        try {
          editorRef.current.update(() => {
            const root = $getRoot();
            const currentHtml = $generateHtmlFromNodes(editorRef.current) ?? "";

            const normalizedCurrent = currentHtml.replace(/\s+/g, " ").trim();
            const normalizedValue = (value ?? "").replace(/\s+/g, " ").trim();

            if (normalizedValue !== normalizedCurrent) {
              root.clear();
              const parser = new DOMParser();
              const dom = parser.parseFromString(value ?? "", "text/html");
              const nodes = $generateNodesFromDOM(editorRef.current, dom);
              root.append(...nodes);
              lastSetValueRef.current = value ?? "";
              updateCharacterCount();
            }
          });
        } catch {
          // ignore
        }
      }
    }, [value]);

    // Character limit handling
    useEffect(() => {
      characterLimitExceeded?.(characterCount > maxLength);
    }, [characterCount, maxLength, characterLimitExceeded]);

    // Mount status
    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);

    // Auto focus
    useEffect(() => {
      if (autoFocusRef.current && editorRef.current) {
        setTimeout(() => {
          try {
            editorRef.current?.focus?.();
          } catch {
            // ignore
          }
        }, 100);
      }
    }, []);

    // Blur & focus events
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleBlurEvent = (e: FocusEvent) => {
        if (!container.contains(e.relatedTarget as Node)) {
          if (editorRef.current && !isComposingRef.current) {
            try {
              editorRef.current.getEditorState().read(() => {
                const html = $generateHtmlFromNodes(editorRef.current);
                onBlur?.(html);
              });
            } catch {
              // ignore
            }
          }
        }
      };

      const handleFocusIn = () => {
        onFocus?.();
      };

      const handleCompositionStart = () => {
        isComposingRef.current = true;
      };

      const handleCompositionEnd = () => {
        isComposingRef.current = false;
      };

      container.addEventListener("focusout", handleBlurEvent as EventListener);
      container.addEventListener("focusin", handleFocusIn);
      container.addEventListener("compositionstart", handleCompositionStart);
      container.addEventListener("compositionend", handleCompositionEnd);

      return () => {
        container.removeEventListener(
          "focusout",
          handleBlurEvent as EventListener
        );
        container.removeEventListener("focusin", handleFocusIn);
        container.removeEventListener(
          "compositionstart",
          handleCompositionStart
        );
        container.removeEventListener("compositionend", handleCompositionEnd);
      };
    }, [onBlur, onFocus]);

    const updateCharacterCount = useCallback(() => {
      try {
        editorRef.current?.getEditorState().read(() => {
          const textLength = $getRoot().getTextContent().length;
          setCharacterCount(textLength);
        });
      } catch {
        // ignore
      }
    }, []);

    const handleChange = useCallback(
      (_editorState: string, editor: any) => {
        if (!editor) return;

        if (!editorRef.current) {
          editorRef.current = editor;
          if (autoFocusRef.current) {
            setTimeout(() => editorRef.current?.focus?.(), 100);
          }
        }

        if (!isEditorReadyCalled.current) {
          isEditorReadyCalled.current = true;
          onEditorReady?.(editor);
        }

        try {
          editor.getEditorState().read(() => {
            const html = $generateHtmlFromNodes(editor) ?? "";
            const textContent = $getRoot().getTextContent() ?? "";

            if (html !== lastSetValueRef.current) {
              onChange?.(html, textContent);
              if (isControlled.current) {
                lastSetValueRef.current = html;
              }
            }

            setCharacterCount(textContent.length);
          });
        } catch {
          // ignore
        }
      },
      [onChange, onEditorReady]
    );

    // Expose API methods
    useImperativeHandle(ref, () => ({
      focus: () => editorRef.current?.focus(),
      getHtmlContent: () => {
        let html = "";
        if (editorRef.current) {
          editorRef.current.getEditorState().read(() => {
            html = $generateHtmlFromNodes(editorRef.current) ?? "";
          });
        }
        return html;
      },
      getTextContent: () => {
        let text = "";
        if (editorRef.current) {
          editorRef.current.getEditorState().read(() => {
            text = $getRoot().getTextContent() ?? "";
          });
        }
        return text;
      },
      clearContent: () => {
        editorRef.current?.update(() => {
          $getRoot().clear();
        });
      },
      getCharacterCount: () => characterCount,
      getEditorInstance: () => editorRef.current,
    }));

    const ToolbarPluginAny =
      ToolbarPlugin as unknown as React.ComponentType<any>;
    const EditorAny = Editor as unknown as React.ComponentType<any>;

    // Toolbar
    const renderToolbar = () => {
      if (!toolbarConfig?.visible) return null;
      if (toolbarConfig.customToolbar) return toolbarConfig.customToolbar;

      const defaultItems = toolbarConfig.items || [
        <FontFamilyDropdown key="font-family" />,
        // <FontFormat
        <FontSizeDropdown key="font-size" />,
        <Divider key="div1" />,
        <BoldButton key="bold" />,
        <ItalicButton key="italic" />,
        <UnderlineButton key="underline" />,
        <CodeFormatButton key="code" />,
        <InsertLinkButton key="link" />,
        <Divider key="div2" />,
        <TextColorPicker key="text-color" />,
        <BackgroundColorPicker key="bg-color" />,
        <TextFormatDropdown key="text-format" />,
        <Divider key="div3" />,
        <InsertDropdown
          key="insert"
          enableImage={{ enable: true, maxWidth: 600 }}
          enablePoll={true}
          enableTable={true}
        />,
        <Divider key="div4" />,
        <AlignDropdown key="align" />,
      ];

      return (
        <div
          className={`w-full flex flex-wrap items-center py-1 border rounded-md border-gray-300 ${toolbarClassName}`}
          style={{
            position: toolbarConfig.sticky ? "sticky" : undefined,
            top: 0,
            zIndex: 20,
          }}
        >
          <ToolbarPluginAny>
            {defaultItems.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-center py-1 rounded-md hover:bg-gray-200 transition"
              >
                {item}
              </div>
            ))}
          </ToolbarPluginAny>
        </div>
      );
    };

    const themeClass =
      theme === "dark"
        ? ""
        : theme === "system"
        ? "system-theme"
        : "light-theme bg-white text-gray-800";

    return (
      <div
        ref={containerRef}
        className={`email-editor border border-gray-300 rounded-md shadow-md overflow-hidden ${themeClass} ${className}`}
      >
        <EditorComposer>
          <EditorAny
            placeholder={placeholder}
            onChange={handleChange}
            isEditable={!readOnly}
          >
            {renderToolbar()}

            <div
              className={`editor-content flex-1 p-4 text-gray-800 leading-relaxed prose prose-sm max-w-none ${editorClassName}`}
            >
              {plugins.map((Plugin, index) => (
                <Plugin key={`plugin-${index}`} />
              ))}
            </div>
          </EditorAny>
        </EditorComposer>

        {showStatusBar && (
          <div
            className={`editor-status-bar flex justify-end items-center py-2 px-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 ${statusBarClassName}`}
          >
            {characterCount > maxLength && (
              <span className="text-red-500 font-semibold mr-2">
                Character limit exceeded!
              </span>
            )}
            <span
              className={`character-count ${
                characterCount > maxLength
                  ? "text-red-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              {characterCount}/{maxLength}
            </span>
          </div>
        )}
      </div>
    );
  }
);

EmailTextEditor.displayName = "EmailTextEditor";
export default EmailTextEditor;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
//   useCallback,
//   type ComponentType,
// } from "react";
// import {
//   EditorComposer,
//   Editor,
//   ToolbarPlugin,
//   AlignDropdown,
//   BackgroundColorPicker,
//   BoldButton,
//   CodeFormatButton,
//   FontFamilyDropdown,
//   FontSizeDropdown,
//   InsertDropdown,
//   InsertLinkButton,
//   ItalicButton,
//   TextColorPicker,
//   TextFormatDropdown,
//   UnderlineButton,
//   Divider,
// } from "verbum";
// import { $getRoot } from "lexical";
// import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

// export interface EmailTextEditorRef {
//   focus: () => void;
//   getHtmlContent: () => string;
//   getTextContent: () => string;
//   clearContent: () => void;
//   getCharacterCount: () => number;
//   getEditorInstance: () => any;
// }

// interface EmailTextEditorProps {
//   value?: string;
//   placeholder?: string;
//   readOnly?: boolean;
//   theme?: "light" | "dark" | "system";
//   maxLength?: number;
//   autoFocus?: boolean;
//   onChange?: (html: string, textContent: string) => void;
//   onBlur?: (html: string) => void;
//   onFocus?: () => void;
//   onEditorReady?: (editor: any) => void;
//   toolbarConfig?: {
//     visible?: boolean;
//     items?: React.ReactNode[];
//     customToolbar?: React.ReactNode;
//     sticky?: boolean;
//   };
//   plugins?: ComponentType<any>[];
//   characterLimitExceeded?: (exceeded: boolean) => void;
//   className?: string;
//   editorClassName?: string;
//   toolbarClassName?: string;
//   statusBarClassName?: string;
//   showStatusBar?: boolean;
//   customPlaceholder?: React.ReactNode;
//   resetKey?: string | number;
// }

// const EmailTextEditor = forwardRef<EmailTextEditorRef, EmailTextEditorProps>(
//   (props, ref) => {
//     const {
//       value,
//       placeholder = "Start typing your email...",
//       readOnly = false,
//       theme = "light",
//       maxLength = 5000,
//       autoFocus = false,
//       onChange,
//       onBlur,
//       onFocus,
//       onEditorReady,
//       toolbarConfig = {
//         visible: true,
//         items: undefined,
//         sticky: true,
//       },
//       plugins = [],
//       characterLimitExceeded,
//       className = "",
//       editorClassName = "",
//       toolbarClassName = "",
//       statusBarClassName = "",
//       showStatusBar = true,
//       resetKey,
//     } = props;

//     const [characterCount, setCharacterCount] = useState(0);
//     const editorRef = useRef<any>(null);
//     const lastSetValueRef = useRef<string>(value ?? "");
//     const isMountedRef = useRef(false);
//     const isEditorReadyCalled = useRef(false);
//     const isControlled = useRef<boolean>(value !== undefined);
//     const isComposingRef = useRef(false);
//     const autoFocusRef = useRef(autoFocus);
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Keep autoFocus ref up to date
//     useEffect(() => {
//       autoFocusRef.current = autoFocus;
//     }, [autoFocus]);

//     // Reset editor when resetKey changes
//     useEffect(() => {
//       if (editorRef.current && resetKey !== undefined) {
//         try {
//           editorRef.current.update(() => {
//             const root = $getRoot();
//             root.clear();

//             if (value) {
//               const parser = new DOMParser();
//               const dom = parser.parseFromString(value, "text/html");
//               const nodes = $generateNodesFromDOM(editorRef.current, dom);
//               root.append(...nodes);
//             }
//           });
//           lastSetValueRef.current = value ?? "";
//           updateCharacterCount();
//         } catch (err) {
//           // ignore - defensive
//         }
//       }
//     }, [resetKey, value]);

//     // Handle external value changes (controlled mode)
//     useEffect(() => {
//       if (!editorRef.current || !isMountedRef.current || !isControlled.current)
//         return;

//       if (value !== lastSetValueRef.current) {
//         try {
//           editorRef.current.update(() => {
//             const root = $getRoot();
//             const currentHtml = $generateHtmlFromNodes(editorRef.current) ?? "";

//             // Normalize HTML for comparison
//             const normalizedCurrent = currentHtml.replace(/\s+/g, " ").trim();
//             const normalizedValue = (value ?? "").replace(/\s+/g, " ").trim();

//             if (normalizedValue !== normalizedCurrent) {
//               root.clear();
//               const parser = new DOMParser();
//               const dom = parser.parseFromString(value ?? "", "text/html");
//               const nodes = $generateNodesFromDOM(editorRef.current, dom);
//               root.append(...nodes);
//               lastSetValueRef.current = value ?? "";
//               updateCharacterCount();
//             }
//           });
//         } catch (err) {
//           // ignore
//         }
//       }
//     }, [value]);

//     // Character limit handling
//     useEffect(() => {
//       characterLimitExceeded?.(characterCount > maxLength);
//     }, [characterCount, maxLength, characterLimitExceeded]);

//     // Mount status
//     useEffect(() => {
//       isMountedRef.current = true;
//       return () => {
//         isMountedRef.current = false;
//       };
//     }, []);

//     // Implement autoFocus when editor instance becomes available (we also focus on first onChange that provides editor)
//     useEffect(() => {
//       if (autoFocusRef.current && editorRef.current) {
//         setTimeout(() => {
//           try {
//             editorRef.current?.focus?.();
//           } catch (err) {
//             // ignore
//           }
//         }, 100);
//       }
//     }, []);

//     // Implement custom blur handling (focusout) and forward onFocus & composition events from the container
//     useEffect(() => {
//       const container = containerRef.current;
//       if (!container) return;

//       const handleBlurEvent = (e: FocusEvent) => {
//         if (!container.contains(e.relatedTarget as Node)) {
//           if (editorRef.current && !isComposingRef.current) {
//             try {
//               editorRef.current.getEditorState().read(() => {
//                 const html = $generateHtmlFromNodes(editorRef.current);
//                 onBlur?.(html);
//               });
//             } catch (err) {
//               // ignore
//             }
//           }
//         }
//       };

//       const handleFocusIn = () => {
//         onFocus?.();
//       };

//       const handleCompositionStart = () => {
//         isComposingRef.current = true;
//       };

//       const handleCompositionEnd = () => {
//         isComposingRef.current = false;
//       };

//       container.addEventListener("focusout", handleBlurEvent as EventListener);
//       container.addEventListener("focusin", handleFocusIn);
//       container.addEventListener("compositionstart", handleCompositionStart);
//       container.addEventListener("compositionend", handleCompositionEnd);

//       return () => {
//         container.removeEventListener(
//           "focusout",
//           handleBlurEvent as EventListener
//         );
//         container.removeEventListener("focusin", handleFocusIn);
//         container.removeEventListener(
//           "compositionstart",
//           handleCompositionStart
//         );
//         container.removeEventListener("compositionend", handleCompositionEnd);
//       };
//     }, [onBlur, onFocus]);

//     const updateCharacterCount = useCallback(() => {
//       try {
//         editorRef.current?.getEditorState().read(() => {
//           const textLength = $getRoot().getTextContent().length;
//           setCharacterCount(textLength);
//         });
//       } catch (err) {
//         // ignore
//       }
//     }, []);

//     const handleChange = useCallback(
//       (_editorState: string, editor: any) => {
//         if (!editor) return;

//         if (!editorRef.current) {
//           editorRef.current = editor;

//           // Apply autoFocus when editor is first initialized
//           if (autoFocusRef.current) {
//             setTimeout(() => {
//               try {
//                 editorRef.current?.focus();
//               } catch (err) {
//                 // ignore
//               }
//             }, 100);
//           }
//         }

//         if (!isEditorReadyCalled.current) {
//           isEditorReadyCalled.current = true;
//           onEditorReady?.(editor);
//         }

//         try {
//           editor.getEditorState().read(() => {
//             const html = $generateHtmlFromNodes(editor) ?? "";
//             const textContent = $getRoot().getTextContent() ?? "";

//             if (html !== lastSetValueRef.current) {
//               onChange?.(html, textContent);
//               if (isControlled.current) {
//                 lastSetValueRef.current = html;
//               }
//             }

//             setCharacterCount(textContent.length);
//           });
//         } catch (err) {
//           // ignore
//         }
//       },
//       [onChange, onEditorReady]
//     );

//     // Expose API methods
//     useImperativeHandle(ref, () => ({
//       focus: () => editorRef.current?.focus(),
//       getHtmlContent: () => {
//         let html = "";
//         if (editorRef.current) {
//           try {
//             editorRef.current.getEditorState().read(() => {
//               html = $generateHtmlFromNodes(editorRef.current) ?? "";
//             });
//           } catch (err) {
//             // ignore
//           }
//         }
//         return html;
//       },
//       getTextContent: () => {
//         let text = "";
//         if (editorRef.current) {
//           try {
//             editorRef.current.getEditorState().read(() => {
//               text = $getRoot().getTextContent() ?? "";
//             });
//           } catch (err) {
//             // ignore
//           }
//         }
//         return text;
//       },
//       clearContent: () => {
//         try {
//           editorRef.current?.update(() => {
//             $getRoot().clear();
//           });
//         } catch (err) {
//           // ignore
//         }
//       },
//       getCharacterCount: () => characterCount,
//       getEditorInstance: () => editorRef.current,
//     }));

//     // Create a small wrapper for ToolbarPlugin and Editor to avoid typing mismatches in 3rd party lib declarations
//     const ToolbarPluginAny =
//       ToolbarPlugin as unknown as React.ComponentType<any>;
//     const EditorAny = Editor as unknown as React.ComponentType<any>;

//     // Custom Toolbar
//     const renderToolbar = () => {
//       if (!toolbarConfig?.visible) return null;

//       if (toolbarConfig.customToolbar) {
//         return toolbarConfig.customToolbar;
//       }

//       const defaultItems = toolbarConfig.items || [
//         <FontFamilyDropdown key="font-family" />,
//         <FontSizeDropdown key="font-size" />,
//         <Divider key="div1" />,
//         <BoldButton key="bold" />,
//         <ItalicButton key="italic" />,
//         <UnderlineButton key="underline" />,
//         <CodeFormatButton key="code" />,
//         <InsertLinkButton key="link" />,
//         <Divider key="div2" />,
//         <TextColorPicker key="text-color" />,
//         <BackgroundColorPicker key="bg-color" />,
//         <TextFormatDropdown key="text-format" />,
//         <Divider key="div3" />,
//         <InsertDropdown
//           key="insert"
//           enableImage={{ enable: true, maxWidth: 600 }}
//           enablePoll={true}
//           enableTable={true}
//         />,
//         <Divider key="div4" />,
//         <AlignDropdown key="align" />,
//       ];

//       // Use a wrapper div for styling and stickiness so we don't rely on possibly-missing props on the third-party ToolbarPlugin.
//       return (
//         <div
//           // className={`w-full flex flex-wrap items-center gap-2 px-2 py-1 bg-gray-100 border-b border-gray-300 ${toolbarClassName}`}
//           style={{
//             position: toolbarConfig.sticky ? "sticky" : undefined,
//             top: 0,
//             zIndex: 20,
//           }}
//         >
//           <ToolbarPluginAny>
//             {defaultItems.map((item: any, index: number) => (
//               <div
//                 key={index}
//                 // className="flex items-center justify-center px-2 py-1 rounded-md hover:bg-gray-200 transition"
//               >
//                 {item}
//               </div>
//             ))}
//           </ToolbarPluginAny>
//         </div>
//       );
//     };

//     const themeClass =
//       theme === "dark"
//         ? "dark-theme bg-gray-900 text-white"
//         : theme === "system"
//         ? "system-theme"
//         : "light-theme bg-white text-gray-800";

//     return (
//       <div
//         ref={containerRef}
//         // className={`email-editor border border-gray-300 rounded-md shadow-md overflow-hidden ${themeClass} ${className}`}
//       >
//         <EditorComposer>
//           <EditorAny
//             placeholder={placeholder}
//             onChange={handleChange}
//             isEditable={!readOnly}
//           >
//             {/* Toolbar */}
//             {renderToolbar()}

//             {/* Editable area -- keep plugins and other custom UI here. The actual editable region is managed by the editor instance. */}
//             <div
//             // className={`editor-content flex-1 min-h-[250px] p-4 text-gray-800 leading-relaxed prose prose-sm max-w-none ${editorClassName}`}
//             >
//               {plugins.map((Plugin, index) => (
//                 <Plugin key={`plugin-${index}`} />
//               ))}
//             </div>
//           </EditorAny>
//         </EditorComposer>

//         {/* Status bar */}
//         {showStatusBar && (
//           <div
//           // className={`editor-status-bar flex justify-end items-center px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 ${statusBarClassName}`}
//           >
//             {characterCount > maxLength && (
//               <span className="text-red-500 font-semibold mr-2">
//                 Character limit exceeded!
//               </span>
//             )}
//             <span
//               className={`character-count ${
//                 characterCount > maxLength
//                   ? "text-red-500 font-bold"
//                   : "text-gray-500"
//               }`}
//             >
//               {characterCount}/{maxLength}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// EmailTextEditor.displayName = "EmailTextEditor";
// export default EmailTextEditor;
