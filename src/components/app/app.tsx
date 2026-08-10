import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [stylesState, setStyles] = useState<CSSProperties>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

	const [formState, setFormState] = useState(defaultArticleState);
	function changeStyles(newStyles: ArticleStateType) {
		setStyles((prevState) => ({
			...prevState,
			'--font-family': newStyles.fontFamilyOption.value,
			'--font-size': newStyles.fontSizeOption.value,
			'--font-color': newStyles.fontColor.value,
			'--container-width': newStyles.contentWidth.value,
			'--bg-color': newStyles.backgroundColor.value,
		}));
	}
	function changeForm(newFormState: ArticleStateType) {
		setFormState((prevState) => ({
			...prevState,
			...newFormState,
		}));
	}

	function applyChanges(newState: ArticleStateType) {
		changeForm(newState);
		changeStyles(newState);
	}

	function resetForm() {
		changeForm(defaultArticleState);
		changeStyles(defaultArticleState);
	}

	return (
		<main className={clsx(styles.main)} style={stylesState}>
			<ArticleParamsForm
				{...formState}
				handleSubmit={applyChanges}
				handleReset={resetForm}
			/>
			<Article />
		</main>
	);
};
