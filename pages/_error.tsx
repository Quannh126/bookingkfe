import { NextPageContext } from "next";
import { ErrorProps } from "next/error";

interface CustomErrorProps extends ErrorProps {
    statusCode: number;
}

const ErrorPage = ({ statusCode }: CustomErrorProps) => {
    return (
        <div>
            <h1>Error {statusCode}</h1>
            <p>Oops! Something went wrong.</p>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    return { statusCode };
};

export default ErrorPage;
