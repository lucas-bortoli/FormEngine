import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { filesize as fileSize } from "filesize";
import { formContext } from "../../FormContext";
import { BaseField } from "../BaseField";
import { Schemas, Results } from "../../FormDefinitions";

import styles from "./FileField.module.css";

interface Properties {
  fieldId: string;
}

export const FileField = (properties: Schemas.FileField & Properties) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileHandles, setFileHandles] = useState<File[]>([]);
  const ctx = useContext(formContext);

  const validate = (): boolean => {
    const minimumFiles = properties.minimumFiles ?? 1;
    const maximumFiles = properties.maximumFiles ?? Infinity;
    const maximumTotalSize = properties.maximumFileSize ?? 5242880; // 5 mb

    if (properties.required) {
      // Se excede a quantidade de arquivos...
      if (
        fileHandles.length < minimumFiles ||
        fileHandles.length > maximumFiles
      ) {
        return false;
      }

      // Se o total de bytes excede o máximo...
      if (
        fileHandles.map((f) => f.size).reduce((a, b) => a + b, 0) >
        maximumTotalSize
      ) {
        return false;
      }

      return true;
    }

    return false;
  };

  useEffect(() => {
    const results: Results.Field = {
      type: "fileupload",
      hasValidationError: !validate(),
      files: fileHandles.map((handle) => ({
        name: handle.name,
        size: handle.size,
      })),
    };

    ctx?.setFieldValue<Results.FileField>(properties.fieldId, results);
  }, [fileHandles]);

  const onFileInputChanged = (ev: { target: HTMLInputElement }) => {
    const files = Array.from(ev.target.files!);
    const changedFiles = [] as File[];

    for (const file of files) {
      if (!fileHandles.includes(file)) {
        changedFiles.push(file);
      }
    }

    setFileHandles([...fileHandles, ...changedFiles]);
  };

  const removeFile = (index: number) => {
    setFileHandles(fileHandles.filter((_, i) => i !== index));
  };

  return (
    <BaseField
      {...properties}
      className={styles.field}
      isValid={validate()}
    >
      <button onClick={() => inputRef.current?.click()}>
        Adicionar arquivos...
      </button>
      <input
        type="file"
        ref={inputRef}
        multiple={(properties.maximumFiles || 1) > 1}
        accept={(properties.allowedExtensions || []).join(", ")}
        onChange={(ev) => onFileInputChanged(ev as any)}
      />
      <div className={styles.list}>
        {fileHandles.map((file, index) => {
          return (
            <div className={styles.item}>
              <label className={styles.fileName}>{file.name}</label>
              <span className={styles.fileSize}>{fileSize(file.size)}</span>
              <a
                href="#"
                className={styles.removeItem}
                onClick={(ev) => {
                  ev.preventDefault();
                  removeFile(index);
                }}
              >
                &times;
              </a>
            </div>
          );
        })}
      </div>
    </BaseField>
  );
};
