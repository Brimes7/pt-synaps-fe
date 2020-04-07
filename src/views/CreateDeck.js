import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {CreateCardTitleText} from '../components/Text/TitleText/CreateCardTitleText.js';
import {CreateCard} from '../components/CreateCard/CreateCard.js';
import {DeckName} from '../components/CreateDeck/DeckName.js';
import {SmallDeckSvg} from '../components/SmallDeckSvg/SmallDeckSvg.js';
import {SynapsButton} from '../components/Button/SynapsButton.js';
import {postDeck} from '../actions/decksActions.js';
import {createCard} from '../actions/cardActions.js';
import {useAppHooks} from '../customHooks/useAppHooks.js';
/**
 * Create Deck View
 * @category Views
 * @component
 * @example return (<CreateDeck />);
 */
export const CreateDeck = props => {
  const {
    pathname,
    changePath,
    dispatch,
    usersState,
    decksState,
    theme,
    getLogger,
  } = useAppHooks('CreateDeck');
  const [disableInput, setDisableInput] = useState(false);
  const [newDeck, setNewDeck] = useState({});
  const [newCard, setNewCard] = useState({});
  const [cardNum, setCardNum] = useState(1);
  const [visible, setVisible] = useState({
    question: false,
    answer: false,
  });
  const [cardReady, setCardReady] = useState(false);
  const [highlighted, setHighlighted] = useState({
    title: true,
    question: false,
    answer: false,
  });

  const fieldValidated = stateHook => {
    if (stateHook !== '' && typeof stateHook !== 'undefined') {
      console.log('returning true from fieldValidated');
      return true;
    } else {
      console.log('returning false from fieldValidated');
      return false;
    }
  };

  useEffect(() => {
    let uid = usersState.user.uid;
    console.log('||||logger from useEffect||||', newDeck);
    console.log('||||logger from useEffect||||', newCard);
    if (
      newDeck.deck_name &&
      newCard.question &&
      newCard.answer &&
      newCard.deck_id
    ) {
      console.log('newCard before dispatch|||', newCard);
      dispatch(createCard(newCard, uid));
    }
  }, [newDeck, newCard]);

  const clickHandler = e => {
    e.preventDefault();
    let clickedOn = e.target.name;

    if (clickedOn == 'title' && highlighted.title == true) {
      setHighlighted({
        ...highlighted,
        title: false,
        question: true,
      });
      setVisible({
        ...visible,
        question: true,
      });
    } else if (
      clickedOn == 'question' &&
      highlighted.question == true &&
      fieldValidated(newDeck.deck_name)
    ) {
      setHighlighted({
        ...highlighted,
        question: false,
        answer: true,
      });
      setVisible({
        ...visible,
        answer: true,
      });
    } else if (fieldValidated(newCard.question)) {
      setHighlighted({
        ...highlighted,
        answer: false,
      });
    }
  };

  const changeHandler = e => {
    const targetName = e.target.name;
    console.log('target name||', targetName);
    switch (targetName) {
      case 'title':
        setNewDeck({deck_name: e.target.value});
        break;
      default:
        setNewCard({...newCard, [targetName]: e.target.value});
        break;
    }
    console.log(newDeck);
    console.log(newCard);
  };

  const submitForm = e => {
    e.preventDefault();
    setDisableInput(true);
    let uid = usersState.user.uid;
    dispatch(postDeck(uid, newDeck));
    setNewCard({
      ...newCard,
      deck_id: decksState.decks[0].deck_id + 1,
    });
  };

  return (
    <StyledCreateDeck>
      <CardNameContainer>
        <CardHeaderContainer>
          <CreateCardTitleText text={'Create Deck'} />
          <SmallDeckSvg />
        </CardHeaderContainer>
        <DeckName
          newDeck={newDeck}
          disableInput={disableInput}
          name={'newDeck'}
          changeHandler={changeHandler}
          value={newDeck.deck_name}
          clickHandler={clickHandler}
          highlighted={highlighted.title}
        />
      </CardNameContainer>
      <CreateCardContainer>
        <CreateCard
          id={1}
          changeHandler={changeHandler}
          name={'newCardQuestion'}
          drillName={'question'}
          clickHandler={clickHandler}
          highlighted={highlighted.question}
          visible={visible.question}
          text={`Card ${cardNum} - Question`}
          value={newCard.question}
        />
        <CreateCard
          id={2}
          changeHandler={changeHandler}
          name={'newCardAnswer'}
          drillName={'answer'}
          clickHandler={clickHandler}
          highlighted={highlighted.answer}
          visible={visible.answer}
          text={`Card ${cardNum} - Answer`}
          value={newCard.answer}
        />
      </CreateCardContainer>
      <Bottom>
        <SynapsButton
          onClick={submitForm}
          text={'Add Another Card'}
          type={'primaryCreateCard'}
        />
        <SynapsButton text={'Done'} type={'defaultCreateCard'} />
      </Bottom>
    </StyledCreateDeck>
  );
};

CreateDeck.propTypes = {};

const StyledCreateDeck = styled.div`
  width: 315px;
  height: 812px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CreateCardContainer = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
`;

const CardHeaderContainer = styled.div`
  width: 100%;
  padding: 0 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardNameContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Bottom = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
`;
