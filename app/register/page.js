import Link from "next/link"
export default function Register() {
    return (
        <main className="container max-w-2xl px-6 py-6 mx-auto">
            <section className="border border-light-700 rounded-md p-10">
                <h1 className="text-3xl font-bold text-center">Welcome</h1>
                <h4 className="text-center">Create new Account</h4>
                <form action="" method="get" className="grid gap-5">
                    <div className="grid">
                        <label htmlFor="full-name">Full Name</label>
                        <input type="text" name="full-name" id="full-name" />
                    </div>
                    <div className="grid">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="grid">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button type="submit" className="btn-new">Login</button>
                </form>
                <p>Do you already have an account?</p>
            </section>
        </main>
    )
  }