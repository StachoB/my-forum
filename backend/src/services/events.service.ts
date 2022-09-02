import { Injectable } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class EventsService {
  private readonly emitterPubli: EventEmitter;
  private readonly emitterComments: EventEmitter;
  private readonly emitterLikes: EventEmitter;

  constructor() {
    // Inject some Service here and everything about SSE will stop to work.
    this.emitterPubli = new EventEmitter();
    this.emitterComments = new EventEmitter();
    this.emitterLikes = new EventEmitter();
  }

  subscribePubli() {
    return fromEvent(this.emitterPubli, 'eventPubli');
  }

  async emitPubli(data) {
    this.emitterPubli.emit('eventPubli', { data });
  }

  subscribeComments() {
    return fromEvent(this.emitterComments, 'eventComments');
  }

  async emitComments(data) {
    this.emitterComments.emit('eventComments', { data });
  }

  subscribeLikes() {
    return fromEvent(this.emitterLikes, 'eventLikes');
  }

  async emitLikes(data) {
    this.emitterLikes.emit('eventLikes', { data });
  }
}
