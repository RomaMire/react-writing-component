import { useEffect, useState, useMemo } from "react";
import styles from "./greet.module.scss";

const Greet = ({ intro, first, second, third, speed, delay, infinite }) => {
	const [currText, setCurrText] = useState("");
	const [currIdx, setCurrIdx] = useState(0);
	const [i, setI] = useState(0);

	const texts = useMemo(() => {
		return [first, second, third];
	}, [first, second, third]);

	const textsLength = texts.length;

	useEffect(() => {
		let timeout;

		let text = texts[i];

		if (i === textsLength) {
			setI(0);
		} else if (currIdx < text.length) {
			timeout = setTimeout(() => {
				setCurrText((prevText) => prevText + text[currIdx]);
				setCurrIdx((prevIdx) => prevIdx + 1);
			}, speed);
		} else if (infinite && i <= textsLength) {
			setTimeout(() => {
				setCurrIdx(0);
				setCurrText("");
				setI((prevI) => prevI + 1);
			}, delay);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [texts, currIdx, delay, speed, i, infinite, textsLength]);

	return (
		<div className={styles.greet}>
			<p>{intro}</p>
			<p>{currText}</p>
			<span className={styles.greet__cursor}>&gt;</span>
		</div>
	);
};

export default Greet;
