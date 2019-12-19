import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect KBA-style security questions and answers.
 */
class KbaCreateCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback prompt.
   */
  public getPrompt(): string {
    return this.getOutputByName<string>('prompt', '');
  }

  /**
   * Gets the callback's list of pre-defined security questions.
   */
  public getPredefinedQuestions(): string[] {
    return this.getOutputByName<string[]>('predefinedQuestions', []);
  }

  /**
   * Sets the callback's security question.
   */
  public setQuestion(question: string): void {
    this.setValue('question', question);
  }

  /**
   * Sets the callback's security question answer.
   */
  public setAnswer(answer: string): void {
    this.setValue('answer', answer);
  }

  private setValue(type: 'question' | 'answer', value: string): void {
    if (!this.payload.input) {
      throw new Error('KBA payload is missing input');
    }

    const input = this.payload.input.find((x) => x.name.endsWith(type));
    if (!input) {
      throw new Error(`No input has name ending in "${type}"`);
    }
    input.value = value;
  }
}

export default KbaCreateCallback;
