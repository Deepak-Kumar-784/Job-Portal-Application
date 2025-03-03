import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

  
const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const searchJobHandler=(query)=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-15">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
              <Button variant="outline" className="rounded-full "
              onClick={() => searchJobHandler(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
