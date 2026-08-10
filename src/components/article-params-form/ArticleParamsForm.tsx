import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = (
	props: ArticleStateType & {
		handleSubmit: (state: ArticleStateType) => void;
		handleReset: (state: ArticleStateType) => void;
	}
) => {
	const [isOpen, setIsOpen] = useState(false);
	function toggleForm() {
		setIsOpen(!isOpen);
	}
	const [formState, setFormState] = useState<ArticleStateType>(props);
	function selectOption(fieldName: keyof ArticleStateType, value: OptionType) {
		setFormState((prevData) => ({
			...prevData,
			[fieldName]: value,
		}));
	}

	useEffect(() => {
		setFormState(props);
	}, [props]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						props.handleSubmit?.(formState);
					}}
					onReset={(event) => {
						event.preventDefault();
						props.handleReset?.(defaultArticleState);
					}}>
					<h2 className={styles.formTitle}>задайте параметры</h2>
					<Select
						title={'шрифт'}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => selectOption('fontFamilyOption', value)}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'размер шрифта'}
						onChange={(value) => selectOption('fontSizeOption', value)}
					/>
					<Select
						title={'цвет шрифта'}
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => selectOption('fontColor', value)}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => selectOption('backgroundColor', value)}
					/>
					<Select
						title={'ширина контента'}
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => selectOption('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
