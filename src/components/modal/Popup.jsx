import { motion } from "framer-motion"
import { useRouter } from "next/router"

const PopupModal = ({ message, title, success = true, error = false, confirm = false, setModal, handler }) => {
    const router=useRouter()
    return (
        <div className="outer__shell">
            <motion.div className='connectme__message-modal'>
                <div className="connectme__message-modal__title">
                    <h1>{title}</h1>
                    <span></span>
                </div>

                <div className="connectme__message-modal__content">
                    <div className="message">
                        <h3>{message}</h3>
                    </div>
                    {success && (
                        <div className="button">
                            <motion.div className="confirm" whileTap={{ scale: 1.1 }} onClick={() => setModal(false)}>
                                <h3>Sure</h3>
                            </motion.div>
                            <motion.div className="home" whileTap={{ scale: 1.1 }} onClick={() => router.push("/")}>
                                <h3>Home</h3>
                            </motion.div>
                        </div>
                    )}
                    {
                        confirm && (
                            <div className="success" >
                                <motion.div className="yes" whileTap={{ scale: 1.1 }} onClick={handler}>
                                    <h3>Yes</h3>
                                </motion.div>
                                <motion.div className="no" whileTap={{ scale: 1.1 }}>
                                    <h3>No</h3>
                                </motion.div>
                            </div>
                        )
                    }
                    

                </div>
            </motion.div>
        </div>
    )
}

export default PopupModal