import { Component, OnInit } from '@angular/core';

interface ScheduleRow {
  day: string;
  task: string;
  duration: string;
}

interface WeeklySchedule {
  title: string;
  rows: ScheduleRow[];
}

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.css']
})
export class LawComponent implements OnInit {
  private readonly storageKey = 'pravo-za-neya-progress-v1';

  readonly totalStages = 10;

  completedStages = new Set<number>();

  noteVisible = false;
  quoteIndex = 0;
  selectedHours = 7;

  readonly schedules: Record<number, WeeklySchedule> = {
    4: {
      title: 'План за 4 часа',
      rows: [
        { day: 'ПОНЕДЕЛНИК', task: 'Прочети една кратка тема', duration: '45 мин' },
        { day: 'СРЯДА', task: 'Гледай лекция и си води бележки', duration: '45 мин' },
        { day: 'ПЕТЪК', task: 'Работи с нормативен текст и понятия', duration: '60 мин' },
        { day: 'НЕДЕЛЯ', task: 'Разгледай казус и преговори', duration: '90 мин' }
      ]
    },
    7: {
      title: 'План за 7 часа',
      rows: [
        { day: 'ПОНЕДЕЛНИК', task: 'Прочети и обобщи една тема', duration: '60 мин' },
        { day: 'ВТОРНИК', task: 'Гледай лекция и си води бележки', duration: '45 мин' },
        { day: 'СРЯДА', task: 'Работи с нормативен текст', duration: '60 мин' },
        { day: 'ПЕТЪК', task: 'Анализирай казус или съдебно решение', duration: '60 мин' },
        { day: 'СЪБОТА', task: 'Писмена задача или курс', duration: '120 мин' },
        { day: 'НЕДЕЛЯ', task: 'Преговор и план за следващата седмица', duration: '75 мин' }
      ]
    },
    10: {
      title: 'План за 10 часа',
      rows: [
        { day: 'ПОНЕДЕЛНИК', task: 'Прочети глава от учебник', duration: '90 мин' },
        { day: 'ВТОРНИК', task: 'Гледай лекция и си води бележки', duration: '60 мин' },
        { day: 'СРЯДА', task: 'Правно проучване и нормативни текстове', duration: '90 мин' },
        { day: 'ЧЕТВЪРТЪК', task: 'Анализирай казус', duration: '60 мин' },
        { day: 'СЪБОТА', task: 'Писмена задача или курс', duration: '180 мин' },
        { day: 'НЕДЕЛЯ', task: 'Преговор и седмично планиране', duration: '120 мин' }
      ]
    }
  };

  readonly quotes = [
    'Не е нужно да виждаш целия път. Достатъчно е да направиш следващата крачка.',
    'Не всяка трудна страница е пречка. Понякога тя е точно страницата, от която започваш да растеш.',
    'Любопитството те кара да започнеш. Постоянството ти помага да продължиш.',
    'Не е нужно да си най-бързата. Достатъчно е да не спираш да задаваш добри въпроси.',
    'Всяко силно разсъждение започва с внимателно прочетен факт.',
    'Големите мечти се приближават с малки, повтарящи се действия.'
  ];

  ngOnInit(): void {
    this.loadProgress();
  }

  get completedCount(): number {
    return this.completedStages.size;
  }

  get progressPercent(): number {
    return Math.round(
      (this.completedCount / this.totalStages) * 100
    );
  }

  get progressMessage(): string {
    const count = this.completedCount;

    if (count === 0) {
      return 'Всяко начало е малка победа. Избери първия етап.';
    }

    if (count < 3) {
      return 'Чудесно начало — постоянството е по-важно от скоростта.';
    }

    if (count < 6) {
      return 'Вече изгради основа. Продължавай да свързваш идеите.';
    }

    if (count < 10) {
      return 'Толкова много стъпки зад гърба ти — остава още малко!';
    }

    return 'Браво! Завърши всички етапи от тази учебна карта. ♡';
  }

  isStageComplete(stage: number): boolean {
    return this.completedStages.has(stage);
  }

  toggleStage(stage: number, checked: boolean): void {
    if (checked) {
      this.completedStages.add(stage);
    } else {
      this.completedStages.delete(stage);
    }

    this.saveProgress();
  }

  private loadProgress(): void {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!saved) return;

      const value: unknown = JSON.parse(saved);

      if (Array.isArray(value)) {
        this.completedStages = new Set(
          value
            .map(Number)
            .filter(
              (stage: number) =>
                Number.isInteger(stage) &&
                stage >= 1 &&
                stage <= this.totalStages
            )
        );
      }
    } catch {
      this.completedStages = new Set<number>();
    }
  }

  private saveProgress(): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify([...this.completedStages])
      );
    } catch {
      // Напредъкът остава наличен в текущата сесия.
    }
  }

  selectSchedule(hours: number): void {
    if (this.schedules[hours]) {
      this.selectedHours = hours;
    }
  }

  toggleNote(): void {
    this.noteVisible = !this.noteVisible;
  }

  nextQuote(): void {
    this.quoteIndex =
      (this.quoteIndex + 1) % this.quotes.length;
  }
}
