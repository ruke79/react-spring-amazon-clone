import PaymentCheckout from "components/checkout/Payment";
import Layout from "components/profile/Layout";

import api from "util/api";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {

    const { user, tab } = useLoaderData();

    const [dbPM, setDbPM] = useState(user.defaultPaymentMethod);
    const [paymentMethod, setPaymentMethod] = useState(user.defaultPaymentMethod);
    const [error, setErorr] = useState("");

    const handlePM = async () => {
        try {
            const { data } = await api.put("/user/cart/changepm", null, {
                params : { paymentMethod: paymentMethod }
            });
            setErorr("");
            setDbPM(data);
            //window.location.reload();
        } catch (error) {
            setErorr(error.response.data.message);
        }
    };

    return (
        <>
            <Layout
                user={user.user}
                tab={tab}
                title={`${user.username}'s Address`}
            >
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        My Payment Methods
                    </h2>
                </div>
                <PaymentCheckout
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    profile={true}
                />
                <button
                    disabled={!paymentMethod || paymentMethod == dbPM}
                    className={`mt-4 w-52 rounded-xl  text-white p-4 font-semibold text-2xl  ${
                        !paymentMethod || paymentMethod == dbPM
                            ? "cursor-not-allowed bg-slate-400"
                            : "cursor-pointer  bg-amazon-blue_light hover:bg-amazon-blue_dark hover:scale-95 transition"
                    }`}
                    onClick={() => handlePM()}
                >
                    Save
                </button>
                {error && <span className="text-red-500">{error}</span>}
            </Layout>
        </>
    );
};

export default Payment;


export const loader = (authContext) => {

    return async ({params, request}) => {
    
        //const { currentUser } = authContext;
        const searchParams = new URL(request.url).searchParams;
        const tab = Number(searchParams.get('tab')) || 0;
        
        try {

            const { data } = await api.get("/user/profile/payment"); 
                                                 

            console.log(data);
        
            return {
                  user : data,
                  tab : tab 
            }
        
        } catch (error) {
            console.log("erorr >>>", error.response.data.message);
        }
    };
}


// export async function getServerSideProps(context) {
//     db.connectDb();
//     const { query } = context;
//     const session = await getSession(context);
//     const tab = query.tab || 0;

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/",
//             },
//         };
//     }
//     const user = await User.findById(session.user?.id).select(
//         "defaultPaymentMethod"
//     );
//     return {
//         props: {
//             user: session,
//             tab,
//             defaultPaymentMethod: user.defaultPaymentMethod,
//         },
//     };
// }
