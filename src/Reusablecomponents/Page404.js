import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Reusablecomponents/Page404.css";







const Page404 = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 13000);

        return () => clearTimeout(redirectTimer);
    }, [navigate]);
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 col-sm-offset-1 text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404 OOPS...Page Not Found</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">Look like you're lost</h3>

                                <h4>Please Wait While U Get Redirecting   &#x1F607;</h4>
                                <div className="bouncing-loader">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page404;
