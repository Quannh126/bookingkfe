import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>
                Go back to{" "}
                <Link href="/">
                    <a>Homepage</a>
                </Link>
            </p>
            <style jsx>{`
                .not-found {
                    text-align: center;
                    margin-top: 2rem;
                }
                h1 {
                    font-size: 2rem;
                }
                a {
                    color: #0070f3;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default NotFoundPage;
