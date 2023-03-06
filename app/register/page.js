import Link from "next/link"
export default function Register() {
    return (
        <main className="container max-w-2xl px-6 py-6 mx-auto">
            <section className="border border-light-700 rounded-md p-10">
                <h1 className="text-3xl font-bold text-center">Welcome</h1>
                <h4 className="text-center">Create new Account</h4>
                <form action="" method="get" className="grid gap-5 mb-5">
                    <div className="grid gap-2">
                        <label htmlFor="full-name">Full Name</label>
                        <input type="text" name="full-name" id="full-name" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button type="submit" className="btn-new">Login</button>
                </form>
                <p className="py-2">Already have an account?<Link href="../login" className="text-slate-400 font-bold hover:text-white"> Login</Link></p>
                <div>
                    <button className="p-10 bg-black btn-new h-16">Register with your Google account</button>
                </div>
            </section>
        </main>
    )
  }