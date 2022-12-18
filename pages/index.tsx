import MainLayout from "@/components/layout/main";
// import { useRouter } from 'next/router'
import { NextpageWithLayout } from "../models";

const Home: NextpageWithLayout = () => {
  // const router = useRouter()
  // function goToListDetail(){
  //     router.push({
  //          pathname:'/search'
  //     })
  // }
  return <div>Homepage</div>;
};

Home.Layout = MainLayout;

export default Home;
