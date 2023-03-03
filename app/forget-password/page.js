export default function Recovery() {
    return (
        <main className="container max-w-2xl px-6 py-6 mx-auto">
            <section className="border border-light-700 rounded-md p-10">
                <form action="">
                    <div className="grid">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <button type="submit" className="btn-new">Login</button>
                </form>
            </section>
        </main>
    )
  }