import React from "react";
import { Control, Controller } from "react-hook-form";
import FileUpload from "react-mui-fileuploader";
import { FileUploadProps } from "react-mui-fileuploader/dist/types/index.types";
export type UploadProps = FileUploadProps & {
    name: string;
    control: Control<any>;
};
// const [filesToUpload, setFilesToUpload] = useState([]);

// const handleFilesChange = (files) => {
//     // Update chosen files
//     setFilesToUpload([...files]);
// };

export function UploadFileBox({ name, control, ...rest }: UploadProps) {
    // const {
    //     field,
    //     fieldState: { error },
    // } = useController({
    //     name,
    //     control,
    // });

    console.log(control);
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
                    //     console.log(control);
                    // }}
                    onFilesChange={(e) => {
                        field.onChange(e);
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    getBase64={false}
                    multiFile={true}
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
                    // imageSrc={"path/to/custom/image"}
                    BannerProps={{ elevation: 0, variant: "outlined" }}
                    showPlaceholderImage={false}
                    PlaceholderGridProps={{ sm: 12, md: 12 }}
                    LabelsGridProps={{ sm: 12, md: 12 }}
                    // onContextReady={(context) => {
                    //     // access to component context here
                    // }}
                    ContainerProps={{
                        elevation: 0,
                        variant: "outlined",
                        sx: { ml: 1, p: 2 },
                    }}
                    // PlaceholderImageDimension={{
                    //     xs: { width: 128, height: 128 },
                    //     sm: { width: 128, height: 128 },
                    //     md: { width: 164, height: 164 },
                    //     lg: { width: 256, height: 256 },
                    // }}
                />
                //     {error && (
                //         <FormHelperText error>{error?.message}</FormHelperText>
                //     )}
                // </FormControl>
            )}
        />
    );
}
