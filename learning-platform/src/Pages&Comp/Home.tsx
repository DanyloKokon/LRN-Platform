import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase"
import { useNavigate, useParams } from "react-router";

function Home() {
    const params = useParams()
    const [data, setData] = useState<Course[]>([])

    const navigate = useNavigate()
    useEffect(() => {
        async function getData() {
            try {
                const { data, error } = await supabase
                    .from('courses')
                    .select()
                    .eq('name', params.course)

                if (error) {
                    console.error(error)
                } else if (data) {
                    setData(data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        getData()
    }, [params.course])

    return (<section>
        <div></div>
    </section>);
}

export default Home;