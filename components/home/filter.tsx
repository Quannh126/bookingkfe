import { ChangeEvent, Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import {
    setFilterGN,
    setFilterGT,
    selectFilterState,
    setFilterTime,
    setFilterAvSeat,
} from "@/redux/selectedFilter";
import Typography from "@mui/material/Typography";
import { PureLightTheme } from "@/utils";
import {
    Button,
    ButtonProps,
    Grid,
    IconButton,
    debounce,
    styled,
} from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import clsx from "clsx";
import { FormDataState } from "@/pages/coaches";
// import { validateDate } from "@mui/x-date-pickers/internals";
interface IFilterProps {
    // eslint-disable-next-line no-unused-vars
    setFormData: Dispatch<FormDataState>;
    formData: FormDataState;
}

const TimeWrapper = styled(Button)<ButtonProps>(
    ({ theme }) => `
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(192, 192, 192);
    margin: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
    line-height: 1.5;
    font-weight: ${theme.typography.fontWeightMedium};
`
);
const listTimes = [
    {
        title: "Sáng sớm",
        value: "00:00-06:00",
        content: "00:00 - 06:00",
    },
    {
        title: "Buổi sáng",
        value: "06:01-12:00",
        content: "06:01 - 12:00",
    },
    {
        title: "Buổi chiều",
        value: "12:01-18:00",
        content: "12:01 - 18:00",
    },
    {
        title: "Buổi tối",
        value: "18:01-23:59",
        content: "18:01 - 23:59",
    },
];
export default function FilterCard({ setFormData, formData }: IFilterProps) {
    const [selectedTime, setSelectedTime] = useState<String[]>([]);
    const formState = useSelector(selectFilterState);
    const dispatch = useDispatch();
    const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterGT(event.target.checked));
        setFormData({ ...formData, ...{ gt: event.target.checked } });
    };
    const [count, setCount] = useState(0);
    const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterGN(event.target.checked));
        setFormData({ ...formData, ...{ gn: event.target.checked } });
    };

    const handleClickTime = (val: string) => {
        if (selectedTime.includes(val)) {
            // //console.log(selectedSeats + "---" + seatNumber);
            const listSelected = selectedTime.filter((item) => item !== val);
            setSelectedTime(listSelected);
            dispatch(setFilterTime(listSelected.join(",")));
        } else {
            setSelectedTime([...selectedTime, val]);
            dispatch(setFilterTime([...selectedTime, val].join(",")));
        }
    };
    const handleClickPlus = (val: number) => {
        dispatch(setFilterAvSeat(val));
    };
    const debbounceClickPlus = debounce(handleClickPlus, 300);
    const handleClickSub = (val: number) => {
        dispatch(setFilterAvSeat(val));
    };
    const debbounceClickSub = debounce(handleClickSub, 500);
    const children = (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
                sx={{ display: "flex", flexDirection: "column", ml: 3, mb: 3 }}
            >
                <Typography
                    variant="h4"
                    sx={{ marginBottom: PureLightTheme.spacing(2) }}
                >
                    Giờ đi
                </Typography>

                <Grid container spacing={3}>
                    {listTimes.map((item, index) => {
                        const isChecked = selectedTime.some(
                            (time) => item.value === time
                        );
                        return (
                            <Grid item xs={6} key={index}>
                                <TimeWrapper
                                    onClick={() => {
                                        handleClickTime(item.value);
                                    }}
                                    className={clsx({ checked: isChecked })}
                                    sx={{
                                        "&.checked": {
                                            border: "1px solid blue",
                                        },
                                        ".MuiTypography-root": {
                                            color: "#223354",
                                        },
                                    }}
                                >
                                    <Typography>{item.title}</Typography>
                                    <Typography>{item.content}</Typography>
                                </TimeWrapper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 3,
                    mb: 3,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ marginBottom: PureLightTheme.spacing(2) }}
                >
                    Số ghế trống
                </Typography>
                <Box display="flex" flexDirection="row">
                    <IconButton
                        onClick={() => {
                            if (count >= 1) {
                                setCount(count - 1);
                                // dispatch(setFilterAvSeat(count - 1));
                                debbounceClickSub(count - 1);
                            }
                        }}
                        sx={{
                            borderRadius: "50%",
                            color: PureLightTheme.colors.primary.light,
                            backgroundColor:
                                PureLightTheme.colors.primary.lighter,
                        }}
                    >
                        <ArrowBackTwoToneIcon />
                    </IconButton>

                    <Typography sx={{ margin: PureLightTheme.spacing(2) }}>
                        {count}
                    </Typography>
                    <IconButton
                        onClick={() => {
                            if (count <= 9) {
                                setCount(count + 1);
                                // dispatch(setFilterAvSeat(count + 1));
                                debbounceClickPlus(count + 1);
                            }
                        }}
                        sx={{
                            borderRadius: "50%",
                            color: PureLightTheme.colors.primary.light,
                            backgroundColor:
                                PureLightTheme.colors.primary.lighter,
                        }}
                    >
                        <ArrowForwardTwoToneIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                <Typography
                    variant="h4"
                    sx={{ marginBottom: PureLightTheme.spacing(2) }}
                >
                    Loại ghế / giường
                </Typography>
                <FormControlLabel
                    label="Ghế Ngồi"
                    control={
                        <Checkbox
                            checked={formState.gt}
                            onChange={handleChange1}
                        />
                    }
                />
                <FormControlLabel
                    label="Giường nằm"
                    control={
                        <Checkbox
                            checked={formState.gn}
                            onChange={handleChange2}
                        />
                    }
                />
            </Box>
        </Box>
    );

    return <>{children}</>;
}
