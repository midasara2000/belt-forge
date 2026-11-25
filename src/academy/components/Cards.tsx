import { useMemo, useState, type ReactNode } from 'react';
import { shuffleSeeded } from '../rng';
import type {
  ChoiceCard as ChoiceCardT,
  ClassifyCard as ClassifyCardT,
  ConceptCard as ConceptCardT,
  NumericCard as NumericCardT,
  OrderCard as OrderCardT,
  SliderCard as SliderCardT,
} from '../types';
import { Sim } from './Sims';
import { VisualView } from './VisualView';

/** Points per card: 2 = first try, 1 = after hint, 0 = answer revealed. */
export type OnDone = (points: number | null) => void;

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => {
        const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);
        const bullets = lines.filter((l) => l.startsWith('- '));
        const lead = lines.filter((l) => !l.startsWith('- '));
        return (
          <div key={i} className="ac-rich">
            {lead.length > 0 && <p>{inline(lead.join(' '))}</p>}
            {bullets.length > 0 && (
              <ul>
                {bullets.map((b) => (
                  <li key={b}>{inline(b.slice(2))}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

function Feedback({
  tone,
  title,
  children,
}: {
  tone: 'ok' | 'hint' | 'reveal';
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={`ac-feedback ac-feedback--${tone}`} role="status">
      <strong>{title}</strong>
      {children && <div className="ac-feedback__body">{children}</div>}
    </div>
  );
}

type Phase = 'answering' | 'hinted' | 'done';

function useAttempts(onDone: OnDone) {
  const [phase, setPhase] = useState<Phase>('answering');
  const [result, setResult] = useState<'first' | 'second' | 'revealed' | null>(null);
  function grade(correct: boolean) {
    if (correct) {
      const first = phase === 'answering';
      setResult(first ? 'first' : 'second');
      setPhase('done');
      onDone(first ? 2 : 1);
    } else if (phase === 'answering') {
      setPhase('hinted');
    } else {
      setResult('revealed');
      setPhase('done');
      onDone(0);
    }
  }
  return { phase, result, grade };
}

function resultTitle(result: 'first' | 'second' | 'revealed' | null) {
  if (result === 'first') return 'Correct — first try!';
  if (result === 'second') return 'Correct after the hint.';
  return 'Here is the answer.';
}

export function ConceptCardView({ card }: { card: ConceptCardT }) {
  return (
    <div className="ac-card ac-card--concept">
      <h2 className="ac-card__title">{card.title}</h2>
      {card.visual && (
        <div className="ac-card__visual">
          <VisualView visual={card.visual} />
        </div>
      )}
      <RichText text={card.body} />
      {card.keyIdea && <div className="ac-keyidea">{inline(card.keyIdea)}</div>}
    </div>
  );
}

export function ChoiceBody({
  card,
  onDone,
}: {
  card: Omit<ChoiceCardT, 'kind' | 'title'>;
  onDone: OnDone;
}) {
  const { phase, result, grade } = useAttempts(onDone);
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);
  const options = useMemo(
    () => shuffleSeeded(card.options, Math.floor(Math.random() * 1e9)),
    [card.options],
  );

  function check() {
    if (!selected) return;
    const ok = selected === card.answer;
    if (!ok) setWrong((w) => [...w, selected]);
    grade(ok);
    if (!ok) setSelected(null);
  }

  return (
    <>
      <p className="ac-card__prompt">{inline(card.prompt)}</p>
      {card.visual && (
        <div className="ac-card__visual">
          <VisualView visual={card.visual} />
        </div>
      )}
      <div className="ac-options">
        {options.map((o) => {
          const isAnswer = phase === 'done' && o.id === card.answer;
          const isWrong = wrong.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              className={`ac-option ${selected === o.id ? 'is-selected' : ''} ${isAnswer ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
              disabled={phase === 'done' || isWrong}
              onClick={() => setSelected(o.id)}
            >
              {inline(o.label)}
            </button>
          );
        })}
      </div>
      {phase === 'hinted' && <Feedback tone="hint" title="Not quite — hint">{inline(card.hint)}</Feedback>}
      {phase === 'done' && (
        <Feedback tone={result === 'revealed' ? 'reveal' : 'ok'} title={resultTitle(result)}>
          <RichText text={card.explanation} />
        </Feedback>
      )}
      {phase !== 'done' && (
        <button type="button" className="primary ac-check" disabled={!selected} onClick={check}>
          Check
        </button>
      )}
    </>
  );
}

export function ChoiceCardView({ card, onDone }: { card: ChoiceCardT; onDone: OnDone }) {
  return (
    <div className="ac-card">
      <h2 className="ac-card__title">{card.title}</h2>
      <ChoiceBody card={card} onDone={onDone} />
    </div>
  );
}

export function ClassifyCardView({ card, onDone }: { card: ClassifyCardT; onDone: OnDone }) {
  const { phase, result, grade } = useAttempts(onDone);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = card.items.every((i) => picks[i.id]);
  const wrongIds = card.items.filter((i) => picks[i.id] !== i.answer).map((i) => i.id);

  function check() {
    setChecked(true);
    grade(wrongIds.length === 0);
  }

  return (
    <div className="ac-card">
      <h2 className="ac-card__title">{card.title}</h2>
      <p className="ac-card__prompt">{inline(card.prompt)}</p>
      {card.visual && (
        <div className="ac-card__visual">
          <VisualView visual={card.visual} />
        </div>
      )}
      <div className="ac-classify">
        {card.items.map((item) => {
          const pick = picks[item.id];
          const showState = checked && pick;
          const ok = pick === item.answer;
          const locked = phase === 'done' || (checked && ok);
          return (
            <div
              key={item.id}
              className={`ac-classify__row ${showState ? (ok ? 'is-correct' : 'is-wrong') : ''}`}
            >
              <div className="ac-classify__label">
                <strong>{item.label}</strong>
                {item.sample && <span>{item.sample}</span>}
              </div>
              <div className="ac-classify__choices">
                {card.categories.map((c) => {
                  const revealed = phase === 'done' && result === 'revealed' && c.id === item.answer;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`ac-pill ${pick === c.id ? 'is-on' : ''} ${revealed ? 'is-answer' : ''}`}
                      disabled={locked}
                      onClick={() => {
                        setChecked(false);
                        setPicks((p) => ({ ...p, [item.id]: c.id }));
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
              {phase === 'done' && <p className="ac-classify__why">{inline(item.why)}</p>}
            </div>
          );
        })}
      </div>
      {phase === 'hinted' && (
        <Feedback tone="hint" title={`${wrongIds.length} to fix — hint`}>
          {inline(card.hint)}
        </Feedback>
      )}
      {phase === 'done' && <Feedback tone={result === 'revealed' ? 'reveal' : 'ok'} title={resultTitle(result)} />}
      {phase !== 'done' && (
        <button type="button" className="primary ac-check" disabled={!allPicked} onClick={check}>
          Check
        </button>
      )}
    </div>
  );
}

export function NumericCardView({ card, onDone }: { card: NumericCardT; onDone: OnDone }) {
  const { phase, result, grade } = useAttempts(onDone);
  const [value, setValue] = useState('');

  function check() {
    const v = Number(value.replace(',', '.'));
    if (Number.isNaN(v)) return;
    grade(Math.abs(v - card.answer) <= card.tolerance);
  }

  return (
    <div className="ac-card">
      <h2 className="ac-card__title">{card.title}</h2>
      <p className="ac-card__prompt">{inline(card.prompt)}</p>
      {card.visual && (
        <div className="ac-card__visual">
          <VisualView visual={card.visual} />
        </div>
      )}
      <div className="ac-numeric">
        <input
          inputMode="decimal"
          value={value}
          disabled={phase === 'done'}
          placeholder="Your answer"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && phase !== 'done') check();
          }}
        />
        {card.unit && <span>{card.unit}</span>}
      </div>
      {phase === 'hinted' && <Feedback tone="hint" title="Not quite — hint">{inline(card.hint)}</Feedback>}
      {phase === 'done' && (
        <Feedback tone={result === 'revealed' ? 'reveal' : 'ok'} title={`${resultTitle(result)} (${card.answer}${card.unit ? ` ${card.unit}` : ''})`}>
          <RichText text={card.explanation} />
        </Feedback>
      )}
      {phase !== 'done' && (
        <button type="button" className="primary ac-check" disabled={!value.trim()} onClick={check}>
          Check
        </button>
      )}
    </div>
  );
}

export function OrderCardView({ card, onDone, seed }: { card: OrderCardT; onDone: OnDone; seed: number }) {
  const { phase, result, grade } = useAttempts(onDone);
  const pool = useMemo(() => {
    const correct = card.steps.map((s) => s.id).join();
    for (let k = 0; k < 10; k++) {
      const p = shuffleSeeded(card.steps, seed + k);
      if (p.map((s) => s.id).join() !== correct) return p;
    }
    return [...card.steps].reverse();
  }, [card.steps, seed]);
  const [seq, setSeq] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const correctOrder = card.steps.map((s) => s.id);
  const shown = phase === 'done' && result === 'revealed' ? correctOrder : seq;

  function check() {
    setChecked(true);
    grade(seq.every((id, i) => id === correctOrder[i]));
  }

  return (
    <div className="ac-card">
      <h2 className="ac-card__title">{card.title}</h2>
      <p className="ac-card__prompt">{inline(card.prompt)}</p>
      <ol className="ac-order__seq">
        {shown.map((id, i) => {
          const step = card.steps.find((s) => s.id === id)!;
          const ok = correctOrder[i] === id;
          return (
            <li key={id}>
              <button
                type="button"
                className={`ac-order__item ${checked || phase === 'done' ? (ok ? 'is-correct' : 'is-wrong') : ''}`}
                disabled={phase === 'done'}
                onClick={() => {
                  setChecked(false);
                  setSeq((s) => s.filter((x) => x !== id));
                }}
              >
                <span className="ac-order__n">{i + 1}</span>
                {step.label}
              </button>
            </li>
          );
        })}
        {shown.length === 0 && <li className="ac-order__empty">Tap the steps below in order</li>}
      </ol>
      {phase !== 'done' && (
        <div className="ac-order__pool">
          {pool
            .filter((s) => !seq.includes(s.id))
            .map((s) => (
              <button
                key={s.id}
                type="button"
                className="ac-order__item"
                onClick={() => {
                  setChecked(false);
                  setSeq((q) => [...q, s.id]);
                }}
              >
                {s.label}
              </button>
            ))}
        </div>
      )}
      {phase === 'hinted' && (
        <Feedback tone="hint" title="Order not right yet — hint">
          {inline(card.hint)} <em>Tap a placed step to remove it.</em>
        </Feedback>
      )}
      {phase === 'done' && (
        <Feedback tone={result === 'revealed' ? 'reveal' : 'ok'} title={resultTitle(result)}>
          <RichText text={card.explanation} />
        </Feedback>
      )}
      {phase !== 'done' && (
        <button
          type="button"
          className="primary ac-check"
          disabled={seq.length !== card.steps.length}
          onClick={check}
        >
          Check
        </button>
      )}
    </div>
  );
}

export function SliderCardView({ card, onDone }: { card: SliderCardT; onDone: OnDone }) {
  return (
    <div className="ac-card">
      <h2 className="ac-card__title">{card.title}</h2>
      <p className="ac-card__prompt">{inline(card.prompt)}</p>
      <div className="ac-card__visual">
        <Sim kind={card.sim} />
      </div>
      {card.check && (
        <div className="ac-card__followup">
          <ChoiceBody card={card.check} onDone={onDone} />
        </div>
      )}
    </div>
  );
}
