import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase"
import { Link } from "react-router";

interface Course {
    id?: number
    name: string
}

function Courses() {
    const [data, setData] = useState<Course[]>([])

    useEffect(() => {
        async function getList() {
            try {
                const { data, error } = await supabase
                    .from('courses')
                    .select()

                if (error) {
                    console.error(error)
                } else if (data) {
                    setData(data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        getList()
    }, [])

    // async function handleClick() {
    //     const { data, error } = await supabase
    //         .from('courses')
    //         .select()

    //     if (error) {
    //         console.error(error)
    //     } else if (data) {
    //         setData(data)
    //     }
    // }

    return (<div>
        <ul>
            {data.map((course) => (
                <li key={course.id ?? course.name}>
                    <Link to={`/home/${course.name}`}>{course.name}</Link>
                </li>
            ))}
        </ul>
    </div>);
}

export default Courses;