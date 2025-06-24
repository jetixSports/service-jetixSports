import { Injectable } from '@nestjs/common';
import { Invitation } from './invitation.schema';

@Injectable()
export class InvitationsService {
  private invitations: Invitation[] = []; // Almacenamiento temporal en memoria

  createInvitation(invitation: Invitation): Invitation {
    this.invitations.push(invitation);
    return invitation;
  }

  getInvitations(): Invitation[] {
    return this.invitations;
  }

  acceptInvitation(id: string): Invitation | null {
    const invitation = this.invitations.find(inv => inv.id === id);
    if (invitation) {
      invitation.status = 'accepted';
      return invitation;
    }
    return null;
  }

  denyInvitation(id: string): Invitation | null {
    const invitation = this.invitations.find(inv => inv.id === id);
    if (invitation) {
      invitation.status = 'denied';
      return invitation;
    }
    return null;
  }
}
