import { FaTimes,FaEdit } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const Modal = ({ setModal,edit }) => {
    const isUserAllowed = false
    const itemData = [
        {
            title: "Name",
            content: "Richa Kalra"
        },
        {
            title: "Age",
            content: 23
        },
        {
            title: "Qualification",
            content: "M.A Pychologist"
        },
        {
            title: "Height",
            content: 5.5
        },
        {
            title: "Weight",
            content: "53 kgs"
        },
        {
            title: "Vitals",
            content: "34-38-36"
        },
        {
            title: "Shoe Size",
            content: "6"
        },
        {
            title: "Complextion",
            content: "Fair"
        },
        {
            title: "Eye Color",
            content: "Brown"
        },
        {
            title: "Hair Color",
            content: "Black"
        },
        {
            title: "Language",
            content: "Hindi English ,Bengali"
        },
        {
            title: "Location",
            content: "Mumbai, Maharashtra"
        },
        {
            title: "Contact Number",
            content: "+918946764743"
        },
    ]


    return (

        <motion.div className="connectme__user-modal" exit={{ opacity: 0 }}>
            <div className="content">
                <motion.div className="connectme__user-modal__content" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} >
                    {itemData.map((d, i) => (
                        <motion.div className="item" key={d.title} initial={{ x: 50, y: -50, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ ease: [.5, .01, -0.05, .95], duration: 2, delay: .5 * i }}>
                            <div className="title">
                                <h4>{d.title} :-</h4>
                            </div>
                            <div className="content">
                                <p>{d.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="connectme__user-modal__off" onClick={() => setModal(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                    <FaTimes />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Modal