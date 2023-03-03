import Link from "next/link"
export default function Login() {
  return (
        <main className="container max-w-2xl px-6 py-6 mx-auto">
           <section className="border border-light-700 rounded-md p-10">
              <form action="" method="get" className="grid gap-5">
                  <div className="grid">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                  </div>
                  <div className="grid">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="passowrd" />
                  </div>
                  <button type="submit" className="btn-new">Login</button>
              </form>
           </section> 
        </main>
  )
}
