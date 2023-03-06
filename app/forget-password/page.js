export default function Recovery() {
    return (
        <main className="container max-w-2xl px-6 py-6 mx-auto">
            <section className="border border-light-700 rounded-md p-10">
                <h1 className="text-3xl font-bold text-center">Welcome</h1>
                <h4 className="text-center">Provide your Email to receive a verifcation code</h4>
                <form action="" className="grid gap-5 mb-5">
                    <div className="grid gap-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <button type="submit" className="btn-new">Email me a reset password code</button>
                </form>
            </section>
        </main>
    )
  }