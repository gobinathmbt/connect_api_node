import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const CardSlider = () => {
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);
    const [activeIndex3, setActiveIndex3] = useState(0);
    const reviews = [
        {
            author: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
            rating: 5,
            comment:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan elit eu eleifend accumsan.',
        },
        {
            author: 'Jane Smith',
            avatar: 'https://via.placeholder.com/150',
            rating: 4,
            comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan elit eu eleifend accumsan.',
        },
        {
            author: 'Bob Johnson',
            avatar: 'https://via.placeholder.com/150',
            rating: 3,
            comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan elit eu eleifend accumsan.',
        },
        {
            author: 'Alice Williams',
            avatar: 'https://via.placeholder.com/150',
            rating: 4,
            comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan elit eu eleifend accumsan.',
        },
        {
            author: 'Michael Brown',
            avatar: 'https://via.placeholder.com/150',
            rating: 5,
            comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan elit eu eleifend accumsan.',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex1((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [reviews.length]);


    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex2((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [reviews.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex3((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [reviews.length]);

    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-4">    <Carousel
                        autoPlay={false}
                        animation="slide"
                        indicatorIconButtonProps={{
                            'aria-label': 'carousel slide indicators',
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                color: '#000',
                            },
                        }}
                        index={activeIndex1}
                        onChange={(index) => setActiveIndex1(index)}
                    >
                        {reviews.map((review, index) => {
                            const isFrontCard = index >= activeIndex1 && index <= activeIndex1 + 2;
                            return (
                                <Card
                                    key={index}
                                    sx={{
                                        maxWidth: 400,
                                        transform: isFrontCard ? 'none' : 'scale(0.8)',
                                        opacity: isFrontCard ? 1 : 0.7,
                                    }}
                                >
                                    <CardHeader
                                        avatar={<Avatar src={review.avatar} alt={review.author} />}
                                        title={review.author}
                                        subheader={
                                            <Rating name="rating" value={review.rating} max={5} readOnly />
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {review.comment}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Carousel></div>







                    <div class="col-sm-4">    <Carousel
                        autoPlay={false}
                        animation="slide"
                        indicatorIconButtonProps={{
                            'aria-label': 'carousel slide indicators',
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                color: '#000',
                            },
                        }}
                        index={activeIndex2}
                        onChange={(index) => setActiveIndex2(index)}
                    >
                        {reviews.map((review, index) => {
                            const isFrontCard = index >= activeIndex2&& index <= activeIndex2 + 2;
                            return (
                                <Card
                                    key={index}
                                    sx={{
                                        maxWidth: 400,
                                        transform: isFrontCard ? 'none' : 'scale(0.8)',
                                        opacity: isFrontCard ? 1 : 0.7,
                                    }}
                                >
                                    <CardHeader
                                        avatar={<Avatar src={review.avatar} alt={review.author} />}
                                        title={review.author}
                                        subheader={
                                            <Rating name="rating" value={review.rating} max={5} readOnly />
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {review.comment}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Carousel></div>





                    <div class="col-sm-4">    <Carousel
                        autoPlay={false}
                        animation="slide"
                        indicatorIconButtonProps={{
                            'aria-label': 'carousel slide indicators',
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                color: '#000',
                            },
                        }}
                        index={activeIndex3}
                        onChange={(index) => setActiveIndex3(index)}
                    >
                        {reviews.map((review, index) => {
                            const isFrontCard = index >= activeIndex3 && index <= activeIndex3 + 2;
                            return (
                                <Card
                                    key={index}
                                    sx={{
                                        maxWidth: 400,
                                        transform: isFrontCard ? 'none' : 'scale(0.8)',
                                        opacity: isFrontCard ? 1 : 0.7,
                                    }}
                                >
                                    <CardHeader
                                        avatar={<Avatar src={review.avatar} alt={review.author} />}
                                        title={review.author}
                                        subheader={
                                            <Rating name="rating" value={review.rating} max={5} readOnly />
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {review.comment}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Carousel></div>





                </div>
            </div>



        </>
    );
};

export default CardSlider;
