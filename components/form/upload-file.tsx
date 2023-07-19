import React from "react";
import { Control, Controller } from "react-hook-form";
import FileUpload from "react-mui-fileuploader";
import { FileUploadProps } from "react-mui-fileuploader/dist/types/index.types";
export type UploadProps = FileUploadProps & {
    imgSrc?: string;
    name: string;
    control: Control<any>;
};
// const [filesToUpload, setFilesToUpload] = useState([]);

// const handleFilesChange = (files) => {
//     // Update chosen files
//     setFilesToUpload([...files]);
// };

export function UploadFileBox({ name, control, imgSrc, ...rest }: UploadProps) {
    // const {
    //     field,
    //     fieldState: { error },
    // } = useController({
    //     name,
    //     control,
    // });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                // <FormControl fullWidth>
                <FileUpload
                    {...rest}
                    sx={{ m: 1 }}
                    // size="small"
                    // fullWidth
                    // name={"name"}
                    // value={value}
                    // onChange={(e) => {
                    //     field.onChange(e);
                    //     //console.log(control);
                    // }}
                    onFilesChange={(e) => {
                        field.onChange(e);
                    }}
                    onBlur={field.onBlur}
                    // ref={field.ref}
                    getBase64={false}
                    multiFile={false}
                    disabled={false}
                    title=""
                    header="Upload ảnh xe"
                    leftLabel=""
                    rightLabel=""
                    buttonLabel="Chọn file"
                    buttonRemoveLabel="Xoá tất cả"
                    maxFileSize={8}
                    maxUploadFiles={0}
                    maxFilesContainerHeight={200}
                    acceptedType={"image/*"}
                    errorSizeMessage={
                        "fill it or remove it to use the default error message"
                    }
                    allowedExtensions={["jpg", "jpeg", "png"]}
                    // onFilesChange={handleFilesChange}
                    // onError={handleFileUploadError}
                    imageSrc={imgSrc ?? ""}
                    showPlaceholderImage={!imgSrc ? false : true}
                    BannerProps={{ elevation: 0, variant: "outlined" }}
                    PlaceholderGridProps={{ md: 4 }}
                    LabelsGridProps={{ md: 8 }}
                    // onContextReady={(context) => {
                    //     // access to component context here
                    // }}
                    ContainerProps={{
                        elevation: 0,
                        variant: "outlined",
                        sx: { p: 1 },
                    }}
                    PlaceholderImageDimension={{
                        xs: { width: 128, height: 128 },
                        sm: { width: 128, height: 128 },
                        md: { width: 164, height: 164 },
                        lg: { width: 256, height: 256 },
                    }}
                />
            )}
        />
    );
}
