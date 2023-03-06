import Link from "next/link"
export default function Login() {
  return (
        <main className="container max-w-2xl px-6 py-6 mx-auto">
           <section className="border border-light-700 rounded-md p-10">
              <h1 className="text-3xl font-bold text-center">Welcome</h1>
              <h4 className="text-center">Login to your Account</h4>
              <form action=""  className="grid gap-5">
                  <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="passowrd" />
                  </div>
                  <button type="submit" className="btn-new">Login</button>
              </form>
              <p className="py-2">No account yet?<Link href="../register" className="text-slate-400 font-bold hover:text-white"> Register</Link></p>
              <Link href="../forget-password/" className="text-slate-400 font-bold hover:text-white">Forget Password?</Link>
              <div>
                <button className="btn-new p-10">Login with your Google account</button>
              </div>
           </section> 
        </main>
  )
}
