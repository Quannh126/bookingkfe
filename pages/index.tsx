import MainLayout from "@/components/layout/main";
import { SearchCarForm } from "@/components/search";
import { useSearchTrip } from "@/hooks";
import { Box } from "@mui/system";
// import { Stack } from "@mui/material";
// import { useRouter } from 'next/router'
import { NextpageWithLayout, SearchTrip } from "../models";
import { Popular } from "@/components/home";

const Home: NextpageWithLayout = () => {
    const { searchTrip } = useSearchTrip({
        revalidateOnMount: false,
    });
    async function handelSearchTrip(searchTripData: SearchTrip) {
        try {
            await searchTrip(searchTripData);
        } catch (error) {
            console.log("failed to search");
        }
    }
    return (
        <Box component="section">
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: -1,
                    WebkitTapHighlightColor: "transparent",
                }}
            >
                <Box
                    component="img"
                    sx={{
                        height: 600,
                        width: "100%",
                    }}
                    src="/img/background.jpg"
                ></Box>
            </Box>

            <Box
                component="h2"
                sx={{
                    textAlign: "center",
                    zIndex: -2,
                }}
            >
                Online Booking. Save Time and Money!
            </Box>
            <SearchCarForm onSearch={handelSearchTrip} />
            <Popular />
        </Box>
    );
};

Home.Layout = MainLayout;

export default Home;
