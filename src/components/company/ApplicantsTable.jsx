import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/utils/constant';
import { ref, update, onValue } from 'firebase/database';
import Footer from '../shared/Footer';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    if (!jobId) return;
    const jobRef = ref(db, `jobs/${jobId}/applications`);

    const unsubscribe = onValue(jobRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Raw applicants data:', data);
        
        // Process and merge duplicate applicants
        const applicantMap = new Map();
        
        Object.keys(data).forEach((key) => {
          const applicant = { applicantId: key, ...data[key] };
          const existingApplicant = applicantMap.get(applicant.applicantId);
          
          if (existingApplicant) {
            // Merge with existing applicant data
            applicantMap.set(applicant.applicantId, {
              ...existingApplicant,
              ...applicant, // Override with newer data
              status: applicant.status || existingApplicant.status
            });
          } else {
            applicantMap.set(applicant.applicantId, applicant);
          }
        });
        
        const list = Array.from(applicantMap.values());
        console.log('Processed applicants after merge:', list);
        setApplicants(list);
      } else {
        setApplicants([]);
      }
    });

    return () => unsubscribe();
  }, [jobId]);

  const statusHandler = async (status, applicantId) => {
    if (!jobId) return;
    try {
      const applicantRef = ref(db, `jobs/${jobId}/applications/${applicantId}`);
      await update(applicantRef, { status });
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // Helper function to get display value
  const getDisplayValue = (item, field) => {
    switch (field) {
      case 'name':
        return item.fullname || item.fullName || item.name || 'NA';
      case 'email':
        return item.email || 'NA';
      case 'phone':
        return item.phoneNumber || item.phone || item.contact || 'NA';
      case 'date':
        return item.appliedAt || item.createdAt || item.date || null;
      case 'status':
        return item.status || 'Pending';
      default:
        return 'NA';
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Applicants for your job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((item, index) => (
            <TableRow key={`${item.applicantId}-${index}`}>
              <TableCell>{getDisplayValue(item, 'name')}</TableCell>
              <TableCell>{getDisplayValue(item, 'email')}</TableCell>
              <TableCell>{getDisplayValue(item, 'phone')}</TableCell>
              <TableCell>
                {item.resume ? (
                  <a
                    href={item.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.resumeOriginalName || 'Resume'}
                  </a>
                ) : (
                  'NA'
                )}
              </TableCell>
              <TableCell>
                {getDisplayValue(item, 'date') 
                  ? new Date(getDisplayValue(item, 'date')).toLocaleDateString() 
                  : 'NA'
                }
              </TableCell>
              <TableCell>{getDisplayValue(item, 'status')}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-26 bg-white text-center">
                    {shortlistingStatus.map((status) => (
                      <div
                        key={status}
                        onClick={() => statusHandler(status, item.applicantId)}
                        className="flex w-fit underline hover:bg-amber-300 duration-300 rounded-md p-1 text-black items-center my-2 cursor-pointer"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;