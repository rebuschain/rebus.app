import React, { FunctionComponent } from 'react';
import { OverviewLabelValue } from '../../../components/common/overview-label-value';
import { formatNumber } from '../../../utils/format';
import { multiply } from '../../../utils/big';
import moment from 'dayjs';
import utc from 'dayjs/plugin/utc';
moment.extend(utc);
import { IProposal } from './governance-details-page';
import { VoteDialog } from '../../../dialogs/vote';

export const GovernanceDetailsOverview: FunctionComponent<{ proposal: IProposal }> = ({ proposal }) => {
	const [isOpen, setOpen] = React.useState(false);
	return (
		<section className="w-full">
			<div className="flex items-center justify-between">
				<div className="flex flex-col mb-6">
					<h4 className="mr-0.5">Proposal #{proposal.id}</h4>
					<h5 className="mt-3 text-white-mid">{proposal.title}</h5>
				</div>
				<button
					onClick={() => setOpen(true)}
					style={{ width: '164px' }}
					className="hover:opacity-75 bg-primary-200 rounded-lg flex items-center justify-center h-10">
					<p>Vote</p>
				</button>
				<VoteDialog isOpen={isOpen} close={() => setOpen(false)} proposalIndex={proposal.id} />
			</div>
			<div className="flex items-center gap-21.5">
				<OverviewLabelValue label="Status">
					<h6 className="inline">{proposal.status}</h6>
				</OverviewLabelValue>
				<OverviewLabelValue label="Proposal Type">
					<div className="inline">
						<h6 className="inline">{proposal.proposalType}</h6>
					</div>
				</OverviewLabelValue>
				<OverviewLabelValue label="Voting End">
					<div className="inline">
						<h6 className="inline">
							{moment(proposal.votingEnd)
								.utc()
								.format('YYYY-MM-DD HH:mm UTC')}
						</h6>
					</div>
				</OverviewLabelValue>
				{/*<DisplayCliff cliff={state.cliff} />*/}
			</div>
		</section>
	);
};
