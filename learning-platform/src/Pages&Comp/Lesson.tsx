import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase"
import { useParams } from "react-router";

interface Lesson {
    id: string;
    name: string;
    content: string;
}

function Lesson() {
    const params = useParams()
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        async function getLesson() {
            if (!params.course || !params.lesson) {
                setErrorMessage("Lesson not found.")
                return
            }

            try {
                const { data, error } = await supabase
                    .from('courses')
                    .select('lessons')
                    .eq('name', params.course)

                if (error) {
                    console.error(error)
                    setErrorMessage("Could not load this lesson.")
                    return
                }

                const lessons: Lesson[] = data?.[0]?.lessons ?? []
                const selectedLesson = lessons.find((item) => item.id === params.lesson)
                if (selectedLesson) {
                    setLesson(selectedLesson)
                } else {
                    setErrorMessage("Lesson not found.")
                }
            } catch (error) {
                console.error(error)
                setErrorMessage("Could not load this lesson.")
            }
        }

        getLesson()
    }, [params.course, params.lesson])

    if (errorMessage) {
        return <p className="lesson-status" role="alert">{errorMessage}</p>
    }

    if (!lesson) {
        return <p className="lesson-status">Loading lesson...</p>
    }

    return (
        <article className="lesson-content-card">
            <h2>{lesson.name}</h2>
            <p>{lesson.content}</p>
        </article>
    )
}

export default Lesson;
