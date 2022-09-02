import { Controller, Sse } from '@nestjs/common';
import { Public } from 'src/auth/public.guard';
import { EventsService } from 'src/services/events.service';

@Controller('sse')
export class SseController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Sse('events')
  events() {
    return this.eventsService.subscribePubli();
  }

  @Public()
  @Sse('commentevents/:pub_id')
  CommentEvents() {
    return this.eventsService.subscribeComments();
  }

  @Public()
  @Sse('likeevents/:pub_id')
  LikeEvents() {
    return this.eventsService.subscribeLikes();
  }
}
