import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = (props: {
	handleSubmit: (state: ArticleStateType) => void;
	handleReset: (state: ArticleStateType) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	function toggleForm() {
		setIsOpen(!isOpen);
	}
	const formRef = useRef<HTMLDivElement>(null);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	function selectOption(fieldName: keyof ArticleStateType) {
		return (value: OptionType) => {
			setFormState((prevData) => ({
				...prevData,
				[fieldName]: value,
			}));
		};
	}

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formRef,
		onChange: toggleForm,
		onClose: () => {},
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						props.handleSubmit(formState);
					}}
					onReset={(event) => {
						event.preventDefault();
						props.handleReset(defaultArticleState);
						setFormState(defaultArticleState);
					}}>
					<h2 className={styles.formTitle}>задайте параметры</h2>
					<Select
						title={'шрифт'}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={selectOption('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'размер шрифта'}
						onChange={selectOption('fontSizeOption')}
					/>
					<Select
						title={'цвет шрифта'}
						selected={formState.fontColor}
						options={fontColors}
						onChange={selectOption('fontColor')}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={selectOption('backgroundColor')}
					/>
					<Select
						title={'ширина контента'}
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={selectOption('contentWidth')}
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
