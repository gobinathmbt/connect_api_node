import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";


const TestimonialPage = () => {


  const testimonials = [
    {
      id: 1,
      author: "John Doe",
      avatar: "https://st2.depositphotos.com/4169661/9941/i/950/depositphotos_99417700-stock-photo-man-hand-writing-client-testimonials.jpg",
      rating: 4.5,
      content:
        "SmartCliff has been an incredible learning platform for me. The courses are well-structured, and the instructors are highly knowledgeable. I have gained valuable skills that have helped me advance in my career.",
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "https://st2.depositphotos.com/4169661/9941/i/950/depositphotos_99417700-stock-photo-man-hand-writing-client-testimonials.jpg",
      rating: 5,
      content:
        "I can't recommend SmartCliff enough. The quality of the courses is exceptional, and the interactive learning experience makes it engaging and enjoyable. I have achieved significant growth in my skillset thanks to SmartCliff.",
    },
    {
      id: 3,
      author: "Michael Johnson",
      avatar: "https://st2.depositphotos.com/4169661/9941/i/950/depositphotos_99417700-stock-photo-man-hand-writing-client-testimonials.jpg",
      rating: 4,
      content:
        "SmartCliff has exceeded my expectations. The instructors are passionate and provide clear explanations. The platform offers a wide range of courses, allowing me to explore various subjects. It's a game-changer for anyone looking to expand their knowledge.",
    },
    {
      id: 4,
      author: "Sarah Williams",
      avatar: "https://st2.depositphotos.com/4169661/9941/i/950/depositphotos_99417700-stock-photo-man-hand-writing-client-testimonials.jpg",
      rating: 4.7,
      content:
        "I'm extremely impressed with SmartCliff. The platform is user-friendly, and the course content is comprehensive. The practical assignments and quizzes helped me solidify my understanding. I feel more confident in my skills after taking courses on SmartCliff.",
    },
    // Add more testimonials here...
  ];

  return (
    <div className="container-fluid pt-5 pb-5" style={{ backgroundColor: "#f4f1de" }} data-aos="fade-up">
      <div className="container">
        <h1 style={{ color: "#111D6F" }} className="mb-5 text-center" data-aos="fade-up">
          Trainees Testimonials
        </h1>
        <Carousel
          className="container"
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                color: "#000000",
                backgroundColor: "#ffffff",
              }}
          
            >
              <Avatar
                src={testimonial.avatar}
                alt={`${testimonial.author}'s Avatar`}
                style={{ width: "180px", height: "180px", marginBottom: "16px" }}
              />
              <Rating
                name={`rating-${testimonial.id}`}
                value={testimonial.rating}
                precision={0.5}
                readOnly
                size="large"
                style={{ marginBottom: "32px" }}
              />
              <Typography
                variant="body1"
                style={{ fontSize: "16px", padding: "8px", color: "#555555" }}
              >
                {testimonial.content}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bold",
                  padding: "16px",
                  marginBottom: "8px",
                  color: "#333333",
                }}
              >
                - {testimonial.author}
              </Typography>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialPage;