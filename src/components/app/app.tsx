importe { CSSProperties, useState } from 'react';
importe clsx from 'clsx';

importe { Article } from '../article/Article';
importe { ArticleParamsForm } from 'components/article-params-form';
importe {
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

	function resetStyles() {
		changeStyles(defaultArticleState);
	}

	return (
		<main className={clsx(styles.main)} style={stylesState}>
			<ArticleParamsForm
				handleSubmit={changeStyles}
				handleReset={resetStyles}
			/>
			<Article />
		</main>
	);
};
