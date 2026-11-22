import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../utils/supabase"
import { Link, Outlet, useParams } from "react-router";
import "./Home.css";

interface Lesson {
    id: string;
    name: string;
    content: string;
}

interface Course {
    name: string;
    lessons: Lesson[] | null;
}

function Home() {
    const params = useParams()
    const [data, setData] = useState<Course[]>([])
    const [lessonName, setLessonName] = useState("")
    const [lessonContent, setLessonContent] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        async function getData() {
            if (!params.course) {
                setErrorMessage("Course not found.")
                return
            }

            try {
                const { data, error } = await supabase
                    .from('courses')
                    .select()
                    .eq('name', params.course)

                if (error) {
                    console.error(error)
                    setErrorMessage("Could not load this course.")
                } else if (data) {
                    setData(data)
                }
            } catch (error) {
                console.error(error)
                setErrorMessage("Could not load this course.")
            }
        }

        getData()
    }, [params.course])

    async function handleAddLesson(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage("")

        const course = data[0]
        if (!course || !params.course) {
            setErrorMessage("Could not find the course to add this lesson to.")
            return
        }

        const newLesson: Lesson = {
            id: crypto.randomUUID(),
            name: lessonName.trim(),
            content: lessonContent.trim(),
        }
        const lessons = [...(course.lessons ?? []), newLesson]

        setIsSaving(true)
        try {
            const { data: updatedCourse, error } = await supabase
                .from('courses')
                .update({ lessons })
                .eq('name', params.course)
                .select('name, lessons')
                .single()

            if (error) {
                console.error(error)
                setErrorMessage("Could not save the lesson.")
                return
            }

            setData([updatedCourse])
            setLessonName("")
            setLessonContent("")
        } catch (error) {
            console.error(error)
            setErrorMessage("Could not save the lesson.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className="course-page">
            <div className="course-overview">
                <header className="course-header">
                    <p className="course-kicker">Course</p>
                    <h1 className="course-title">{data[0]?.name}</h1>
                </header>
                <section className="lesson-list-card" aria-labelledby="lessons-heading">
                    <h2 id="lessons-heading">Lessons</h2>
                    {(data[0]?.lessons ?? []).length > 0 ? (
                        <ul className="lesson-list">
                            {(data[0]?.lessons ?? []).map((lesson) => (
                                <li className="lesson-list-item" key={lesson.id}>
                                    <Link className="lesson-link" to={`/home/${params.course}/${lesson.id}`}>
                                        <span>{lesson.name}</span>
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="lesson-empty">No lessons yet. Add the first one here.</p>
                    )}
                </section>
            </div>
            <aside className="lesson-form-card">
                <form className="lesson-form" onSubmit={handleAddLesson}>
                    <div>
                        <p className="course-kicker">Build your course</p>
                        <h2>Add a lesson</h2>
                    </div>
                    <label className="lesson-field">
                        <span>Lesson name</span>
                        <input
                            required
                            value={lessonName}
                            onChange={(event) => setLessonName(event.target.value)}
                            placeholder="e.g. Getting started"
                        />
                    </label>
                    <label className="lesson-field">
                        <span>Lesson content</span>
                        <textarea
                            required
                            value={lessonContent}
                            onChange={(event) => setLessonContent(event.target.value)}
                            placeholder="Write what students will learn..."
                            rows={5}
                        />
                    </label>
                    <button className="lesson-submit" type="submit" disabled={isSaving}>
                        {isSaving ? "Saving lesson..." : "Add lesson"}
                    </button>
                    {errorMessage && <p className="lesson-error" role="alert">{errorMessage}</p>}
                </form>
            </aside>
            <div className="lesson-view">
                <Outlet />
            </div>
        </section>
    );
}

export default Home;