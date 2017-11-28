import React from 'react';

import { Button, Toast, Card, Modal } from 'antd-mobile';

class Room extends React.Component {
    render() {
        const { room, cancelRoom, recallGrab} = this.props;
        const { id, title, roomName, building, floor, reserveInfo } = room;
        let roomSourceTag = '';
        let buttonJsx = (<Button size="small" inline onClick={() => cancelRoom(reserveInfo.reserveId)}>撤销会议</Button>);

        if(reserveInfo.roomSource == 1) {
            roomSourceTag = (<span className="roomSourceTag">抢来的</span>);
            buttonJsx = (<Button size="small" inline onClick={() => recallGrab(reserveInfo.reserveId)}>抢错了</Button>);
        }
        if(reserveInfo.roomSource == 2) {
            roomSourceTag = (<span className="roomSourceTag">被人抢啦</span>);
            buttonJsx = (<Button size="small" inline onClick={() => location.href = `tel:${reserveInfo.grabPhone}`}>求撤回</Button>);
        }
        return (
            <Card>
              <Card.Header
                title={<span className="gray3 f30">{reserveInfo.title}</span>}
                thumb=""
                extra={roomSourceTag}
              />
              <Card.Body>
                <div className="card-content">
                  <ul>
                  <li><span className="left">会议室：</span><span className="right">{roomName}</span></li>
                  <li><span className="left">会议日期：</span><span className="right">{reserveInfo.date}</span></li>
                  <li><span className="left">会议时间：</span><span className="right">{reserveInfo.start + '-' + reserveInfo.end}</span></li>
                  </ul>
                  <div>
                  {buttonJsx}
                  </div>
                </div>
              </Card.Body>
            </Card>
        )
    }
}

export default Room;
