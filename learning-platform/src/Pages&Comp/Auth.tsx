import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";

function Auth() {
    const [mail, setMail] = useState<string>('')
    const [passowd, setPass] = useState<string>('')
    const [idd, setIdd] = useState<"1" | "2" | null>(null)
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        if (idd === "1") {
            const { error } = await supabase.auth.signUp({ email: mail, password: passowd })
            setMail('')
            setPass('')
        } else if (idd === "2") {
            const { error } = await supabase.auth.signInWithPassword({ email: mail, password: passowd })
            setMail('')
            setPass('')
            navigate('/home')
        }
    }

    return (<section>
        <form onSubmit={handleSubmit} action="">
            <input type="email" required onChange={(e) => setMail(e.currentTarget.value)} value={mail} />
            <input type="password" required onChange={(e) => setPass(e.currentTarget.value)} value={passowd} />
            <button onClick={() => setIdd("1")}>SignUp</button>
            <button onClick={() => setIdd("2")}>LogIn</button>
        </form>
    </section>);
}

export default Auth;