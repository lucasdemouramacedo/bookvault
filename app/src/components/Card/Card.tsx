import Image from "next/image";
import styles from "./style.module.css";
import logo from "../../../public/image.png";

type Item = {
    title: string,
    author: string
}

type Props = {
    item: Item
}

export default function Card(props: Props) {
    return (
        <a  href={"/details-book/" + props.item.id} className={styles.card}>
            <div className={styles.img}>
                <Image alt="" src={logo} />
            </div>
            <div className={styles.title}>
                {props.item?.title}
            </div>
            <div className={styles.author}>
                {props.item?.author}
            </div>
        </a>
    )
}