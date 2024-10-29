import styles from "./style.module.css";

type Props = {
    visible: boolean
    type: string
    message: string
}

export default function Notification(props: Props) {
    if (props.visible) {
        if (props.type == "info") {
            return (
                <div style={{backgroundColor: "rgb(1, 132, 255)"}} className={styles.card}>
                    {props.message}
                </div>
            )
        }
        if (props.type == "warn") {
            return (
                <div style={{backgroundColor: "rgb(247, 74, 74)"}} className={styles.card}>
                    {props.message}
                </div>
            )
        }
    }

    return null
}