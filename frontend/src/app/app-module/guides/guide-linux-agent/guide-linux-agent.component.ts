import {Component, Input, OnInit} from '@angular/core';
import {FederationConnectionService} from '../../../app-management/connection-key/shared/services/federation-connection.service';
import {UtmModulesEnum} from '../../shared/enum/utm-module.enum';

@Component({
  selector: 'app-guide-linux-agent',
  templateUrl: './guide-linux-agent.component.html',
  styleUrls: ['./guide-linux-agent.component.css']
})
export class GuideLinuxAgentComponent implements OnInit {
  @Input() integrationId: number;
  module = UtmModulesEnum;
  @Input() serverId: number;
  token: string;

  constructor(private federationConnectionService: FederationConnectionService) { }

  ngOnInit() {
    this.getToken();
  }


  getToken() {
    this.federationConnectionService.getToken().subscribe(response => {
      if (response.body !== null && response.body !== '') {
        this.token = response.body;
      } else {
        this.token = '';
      }
    });
  }

  getCommandUbuntu(): string {
    const ip = window.location.host.includes(':') ? window.location.host.split(':')[0] : window.location.host;
    return `sudo apt update -y && sudo apt install wget -y && mkdir -p /opt/utmstack-linux-agent && wget -P /opt/utmstack-linux-agent ` +
      `https://cdn.utmstack.com/agent_updates/release/installer/v10.1.2/utmstack_agent_installer && chmod -R 777 ` +
      `/opt/utmstack-linux-agent/utmstack_agent_installer && sudo /opt/utmstack-linux-agent/utmstack_agent_installer install ` + ip  + ` <secret>` + this.token + `</secret> yes`;
  }
  getCommandCentos7RedHat(): string {
    const ip = window.location.host.includes(':') ? window.location.host.split(':')[0] : window.location.host;
    return `sudo yum install wget -y && mkdir /opt/utmstack-linux-agent && wget -P /opt/utmstack-linux-agent ` +
      `https://cdn.utmstack.com/agent_updates/release/installer/v10.1.2/utmstack_agent_installer && chmod -R 777 ` +
      `/opt/utmstack-linux-agent/utmstack_agent_installer && sudo /opt/utmstack-linux-agent/utmstack_agent_installer install ` + ip  + ` <secret>` + this.token + `</secret> yes`;
  }
  getCommandCentos8Almalinux(): string {
    const ip = window.location.host.includes(':') ? window.location.host.split(':')[0] : window.location.host;
    return `sudo dnf install wget -y && mkdir /opt/utmstack-linux-agent && wget -P /opt/utmstack-linux-agent ` +
      `https://cdn.utmstack.com/agent_updates/release/installer/v10.1.2/utmstack_agent_installer && chmod -R 777 ` +
      `/opt/utmstack-linux-agent/utmstack_agent_installer && sudo /opt/utmstack-linux-agent/utmstack_agent_installer install ` + ip  + ` <secret>` + this.token + `</secret> yes`;
  }
  getUninstallCommand(): string {
    return `sudo /opt/utmstack-linux-agent/utmstack_agent_installer uninstall && echo "Removing UTMStack Agent dependencies..." ` +
      `&& sleep 10 && sudo rm -rf "/opt/utmstack-linux-agent" && echo "UTMStack Agent dependencies removed successfully."`;
  }

}