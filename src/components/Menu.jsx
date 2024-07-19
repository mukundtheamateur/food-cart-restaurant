import React from 'react';
import { useMemo, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FoodCard from "./FoodCard";
import "../styles/Menu.css"

function Menu() {

    const [data, setData] = useState([]);
    const [courses,setCourses] = useState([])

    const ref = useRef(null);

    const dataRecuder = (data) => {
        const groupedData = data.reduce((acc, current) => {
            const course = current.course;
            if (!acc[course]) {
                acc[course] = [];
            }
            acc[course].push(current);
            return acc;
        }, {});
        let keys =Object.keys(groupedData);
        setCourses(keys);
        if(keys.length >0) ref.current=keys[0]
        return groupedData;
    }

    const reducedData = useMemo(() => dataRecuder(data), [data]);
    

    useEffect(() => {
        const fetchData = async () => {
            const menuItem = await axios.get("http://localhost:4000/menu/get");
            setData(menuItem.data.menu);
            console.log(menuItem.data.menu)
        }

        fetchData();
    }, []);
    return (
        <div>
            {
                courses.map((course)=>(
                    <div key={course}>
                        <h3 className='font-family-cursive font-weight-bold text-decoration-underline' style={{marginTop:"45px"}} >{course}</h3>
                        <div className='foods'>
                            {
                                reducedData[course].map((item)=>(
                                    <FoodCard food={item} key={item.id} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Menu;
